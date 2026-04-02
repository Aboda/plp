const fs = require("fs");
const zlib = require("zlib");
const path = require("path");
const https = require("https");
const crypto = require('crypto');
let cache = {
    ips:{}
};
let service_no = 0
function create_random_token(base_seed){
    return hash_string("sha512","hex",`${r_bits(1)}${base_seed}${r_bits(1)}${Date.now()}${r_bits(1)}`);
}
function extract_basic_call_data(req){
    return {method:req.method,ip:remove_trailing_ipv6(req.connection.remoteAddress),url:req.url}
}
function favicon(res){
    const favicon = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#000" d="M0 0h16v16H0z"/><path fill="#0f0" d="M2 2v12l12-6z"/></svg>`).toString('base64')
    res.writeHead(200, {
      'Content-Type': 'image/svg+xml',
      'Content-Length': Buffer.byteLength(favicon, 'base64')
    });
    res.end(Buffer.from(favicon, 'base64')); // Send as binary
}
function gate_guard(req){
    /*
        this function uses persistent cache.ips to track the number of requests
        and provide minimal rate limiting for infringing ips

        the logic is:

        each call will store in the track item the caller ip
        if not present create an entry
        then add +1 tho the ip entry
        then calculate how much to deduct since last call
        then assess wheter or not to approve the call

        the idea is that we dont neet to generate a recurring call to manage this and
        that each caller manages its own call rate
    */
    let approval = true;
    const number_of_base_calls = 20;
    const call_retrieval_window = 500;
    const now_ts = Date.now();
    const {ip,method,url} = extract_basic_call_data(req)
    /*
        We might have to remove the ::ffff: part of the ip
    */

    if (cache.ips[ip] == undefined){
        cache.ips[ip] = {count:0,last:now_ts};
    }

    cache.ips[ip].count ++;
    const time_diff = now_ts - cache.ips[ip].last;
    const calls_to_deduct = Math.floor(time_diff / call_retrieval_window);
    if (calls_to_deduct > 0){
        cache.ips[ip].count -= calls_to_deduct;
        if (cache.ips[ip].count < 0){
            cache.ips[ip].count = 0;
        }
        cache.ips[ip].last = now_ts;
    }

    if (cache.ips[ip].count > number_of_base_calls){
        approval = false;
    }

    const reply = {ts:now_ts,m:method,c:cache.ips[ip].count,a:approval,ip,url}
    return reply
}

function get_cookie_value_from_req(req, cookie_name) {
    if (!req.headers.cookie) {
        return null;
    }
    const cookies = req.headers.cookie.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
    }, {});
    return cookies[cookie_name];
}
function get_parameter_from_url_string(url,param){
    try{
        let url_parts = url.split("?");
        let params = url_parts[1].split("&");
        for (let i = 0; i < params.length; i++){
            let key_val = params[i].split("=");
            if (key_val[0] == param){
                return decodeURIComponent(key_val[1]);
            }
        }
    }catch(err){}
    return false
}
function hash_string(algo,output,input){
    const hash = crypto.createHash(algo); // Specify the hash algorithm (e.g., 'sha256', 'sha1', 'md5', etc.)
    hash.update(input);                        // Add the string to be hashed
    return hash.digest(output);                 // Output the hash as a hexadecimal string
}
async function pipe_file_from_filesys(res, http_reply_code, source_path, content_type, is_absolute = false) {
    let absolutePath;
    if (is_absolute){
      absolutePath = source_path;
    }else{
      absolutePath = path.resolve(__dirname, "..", source_path);
    }
    const readStream = fs.createReadStream(absolutePath);

    readStream.on('error', (err) => {
      throw err;
    });

    res.writeHead(http_reply_code, { "Content-Type": content_type });
    readStream.pipe(res);
    readStream.on('end', () => {

    });
}
async function pipe_file_from_filesys_compressed(req, res, http_reply_code, source_path, content_type, is_absolute = false) {
    let absolutePath;
    if (is_absolute) {
        absolutePath = source_path;
    } else {
        absolutePath = path.resolve(__dirname, "..", source_path);
    }

    const accept = req.headers['accept-encoding'] || '';
    let encoding = null;
    let compressor = null;

    // Brotli first (best ratio for text), then gzip
    if (accept.includes('br')) {
        encoding = 'br';
        compressor = zlib.createBrotliCompress();
    } else if (accept.includes('gzip')) {
        encoding = 'gzip';
        compressor = zlib.createGzip();
    }

    const headers = { "Content-Type": content_type };
    if (encoding) {
        headers["Content-Encoding"] = encoding;
    }

    res.writeHead(http_reply_code, headers);

    const readStream = fs.createReadStream(absolutePath);
    readStream.on('error', (err) => { throw err; });

    if (compressor) {
        readStream.pipe(compressor).pipe(res);
    } else {
        readStream.pipe(res);
    }
}
async function pipe_data_to_filesys(req,res,destination_path){
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(destination_path);
        req.pipe(writeStream);
        writeStream.on('finish', () => {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("File saved successfully.");
            resolve();
        });
        writeStream.on('error', (err) => {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error saving file.");
            reject(err);
        });
    });
}
function r_bits(n){
    let bits = "";
    for (let i = 0; i < n; i++){
        bits += Math.random().toString(36).slice(2);
    }
    return bits;
}
async function receive_request_post_data(req){
    const prom = new Promise((s, j) => {
      let b = "";
      req.on("data", c=> b+= c.toString());
      req.on("end", () => {s(b);});
      req.on("error", (e) => {j(e);});
    });
    return prom;
}
function remove_trailing_ipv6(ip){
    if (typeof ip !== "string") return ip;
    if (ip.startsWith("::ffff:")) {
        return ip.replace("::ffff:", "");
    }
    return ip;
}
async function requestlink_auth_follow(uri, token){
    return new Promise((resolve, reject) => {
        https.get(uri, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }, (response) => {
            let result = '';
            response.on('data', (chunk) => {
                result += chunk;
            });
            response.on('end', () => {
                resolve(result);
            });
            response.on('error', (err) => {
                reject(err);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}
async function requestlink_auth_post(uri, token, data) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(data))
            }
        };

        const req = https.request(uri, options, (response) => {
            let result = '';
            response.on('data', (chunk) => {
                result += chunk;
            });
            response.on('end', () => {
                resolve(result);
            });
            response.on('error', (err) => {
                reject(err);
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        req.write(JSON.stringify(data));
        req.end();
    });
}
function reply_error_while_processing(req, res, rep) {
  const reply_code = 500;
  if (rep) rep.reply_code = reply_code;
  res.writeHead(reply_code, {"Content-Type": "text/html"});
  res.end(template_error_page());
}
function reply_site_in_construction(req, res, rep) {
  const reply_code = 500;
  if (rep) rep.reply_code = reply_code;
  res.writeHead(reply_code, { "Content-Type": "text/html" });
  res.end(template_in_construction_page());
}
function reply_request_throttled(req,res){
  res.writeHead(403, {"Content-Type": "text/plain"});
  res.end("403 Forbidden - Your access has been temporarily restricted. Please try again later.");
}
function reply_resource_not_found(req, res, rep) {
  const reply_code = 404;
  if (rep) rep.reply_code = reply_code;
  res.writeHead(reply_code, {"Content-Type": "text/plain"});
  res.end("404 Not Found - The requested resource could not be found.");
}

async function sleep(ms){return new Promise((resolve)=>{setTimeout(resolve, ms);});}

function template_error_page() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>In Construction</title>
        <style>
            body { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f8f8f8; margin: 0; }
        </style>
    </head>
    <body>
        <div>
        <h2 style="text-align:center; font-family:sans-serif; color:#333;">An error has been experienced while servicing your request.</h2>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
          <rect width="500" height="500" fill="#0d0d1a" />
          <g opacity="0.2" stroke="#00ff00" stroke-width="1">
            <path d="M 20,0 V 500 M 480,0 V 500 M 0,20 H 500 M 0,480 H 500 M 100,0 V 500 M 400,0 V 500 M 0,100 H 500 M 0,400 H 500 M 250,0 V 500 M 0,250 H 500" />
            <path d="M 0,0 L 500,500 M 500,0 L 0,500" opacity="0.1" />
          </g>

          <rect x="50" y="350" width="400" height="20" fill="#333" rx="5" />
          <rect x="100" y="200" width="300" height="180" fill="#222" rx="10" /> <rect x="110" y="210" width="280" height="150" fill="#111" rx="5" /> <rect x="120" y="220" width="260" height="130" fill="#001a00"> <animate attributeName="fill" values="#001a00;#003300;#001a00" dur="2s" repeatCount="indefinite" />
          </rect>
          <text x="130" y="245" fill="#00ff00" font-family="monospace" font-size="12">&gt; _error report...</text>
          <text x="130" y="265" fill="#00ff00" font-family="monospace" font-size="12">TARGET: mainframe_db</text>
          <text x="130" y="285" fill="#00ff00" font-family="monospace" font-size="12">STATUS: bypassing firewall [||||||  ]</text>
          <text x="130" y="305" fill="#00ff00" font-family="monospace" font-size="12">USER: [root@feline ~]$</text>
          <rect x="280" y="295" width="8" height="12" fill="#00ff00">
            <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite" />
          </rect>
          <rect x="110" y="380" width="280" height="10" fill="#444" rx="2" /> <g transform="translate(250, 330)">
            <path d="M -60,60 C -80,40 -90,80 -70,100 C -50,120 -30,100 -40,80" fill="none" stroke="#333" stroke-width="8" stroke-linecap="round" />
            <path d="M -70,70 Q -80,0 0,-20 Q 80,0 70,70 L 60,100 Q 0,110 -60,100 Z" fill="#222" />
            <path d="M -50,0 Q -60,-70 0,-80 Q 60,-70 50,0 C 50,40 30,60 0,60 C -30,60 -50,40 -50,0 Z" fill="#333" />
            <path d="M -40,-10 Q -50,-60 0,-70 Q 50,-60 40,-10 C 40,20 20,30 0,30 C -20,30 -40,20 -40,-10 Z" fill="#222" /> <g transform="translate(0, -10)">
              <path d="M -35,-50 L -25,-75 L -10,-55 Z" fill="#222" />
              <path d="M 35,-50 L 25,-75 L 10,-55 Z" fill="#222" />
              <ellipse cx="-15" cy="0" rx="8" ry="5" fill="#00ff00" />
              <ellipse cx="15" cy="0" rx="8" ry="5" fill="#00ff00" />
              <ellipse cx="-15" cy="0" rx="2" ry="4" fill="#000" /> <ellipse cx="15" cy="0" rx="2" ry="4" fill="#000" />
              <path d="M 0,10 L -3,13 L 3,13 Z" fill="#666" />
              <path d="M -3,15 Q 0,18 3,15" fill="none" stroke="#666" stroke-width="1.5" stroke-linecap="round" />
              <path d="M -20,12 L -40,10 M -20,15 L -40,17 M -20,18 L -40,22" fill="none" stroke="#666" stroke-width="1" opacity="0.5" />
              <path d="M 20,12 L 40,10 M 20,15 L 40,17 M 20,18 L 40,22" fill="none" stroke="#666" stroke-width="1" opacity="0.5" />
            </g>
            <ellipse cx="-30" cy="60" rx="15" ry="10" fill="#333" />
            <ellipse cx="30" cy="60" rx="15" ry="10" fill="#333" />
            <path d="M -35,65 L -35,70 M -30,65 L -30,70 M -25,65 L -25,70" fill="none" stroke="#111" stroke-width="2" /> <path d="M 35,65 L 35,70 M 30,65 L 30,70 M 25,65 L 25,70" fill="none" stroke="#111" stroke-width="2" />
          </g>
        </svg>

        </div>
    </body>
    </html>
    `;
}
function template_in_construction_page() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>In Construction</title>
        <style>
            body { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f8f8f8; margin: 0; }
        </style>
    </head>
    <body>
        <div>
          <h2 style="text-align:center; font-family:sans-serif; color:#333;">Page Under Construction</h2>
            <svg width="300" height="200" viewBox="0 0 300 200">
                <!-- Cat body -->
                <ellipse cx="150" cy="130" rx="60" ry="40" fill="#f4c542" stroke="#333" stroke-width="3"/>
                <!-- Cat head -->
                <ellipse cx="150" cy="80" rx="35" ry="30" fill="#f4c542" stroke="#333" stroke-width="3"/>
                <!-- Cat ears -->
                <polygon points="120,60 135,40 140,70" fill="#f4c542" stroke="#333" stroke-width="3"/>
                <polygon points="180,60 165,40 160,70" fill="#f4c542" stroke="#333" stroke-width="3"/>
                <!-- Cat eyes -->
                <ellipse cx="140" cy="80" rx="5" ry="8" fill="#fff" stroke="#333" stroke-width="2"/>
                <ellipse cx="160" cy="80" rx="5" ry="8" fill="#fff" stroke="#333" stroke-width="2"/>
                <circle cx="140" cy="83" r="2" fill="#333"/>
                <circle cx="160" cy="83" r="2" fill="#333"/>
                <!-- Cat nose -->
                <ellipse cx="150" cy="90" rx="4" ry="2" fill="#e07a5f" stroke="#333" stroke-width="1"/>
                <!-- Cat mouth -->
                <path d="M146 95 Q150 100 154 95" stroke="#333" stroke-width="2" fill="none"/>
                <!-- Spanner (wrench) -->
                <rect x="170" y="110" width="60" height="10" rx="5" fill="#bbb" stroke="#333" stroke-width="2" transform="rotate(-20 200 115)"/>
                <ellipse cx="225" cy="115" rx="8" ry="8" fill="#bbb" stroke="#333" stroke-width="2"/>
                <rect x="220" y="110" width="10" height="10" rx="2" fill="#fff" stroke="#333" stroke-width="1"/>
                <!-- Cat paw holding spanner -->
                <ellipse cx="175" cy="120" rx="10" ry="7" fill="#f4c542" stroke="#333" stroke-width="2"/>
            </svg>

        </div>
    </body>
    </html>
    `;
}


function default_router(req,res,infra){
    reply_site_in_construction(req, res);
}

async function read_metadata_from_folder_files(folderpath){
    const files = await fs.promises.readdir(folderpath);
    const metadata = {};
    for (const file of files) {
        const filepath = path.join(folderpath, file);
        const stats = await fs.promises.stat(filepath);
        metadata[file] = {
            size: stats.size, // size in bytes
            last_edited: stats.mtime.getTime(), // modification time
            created: stats.birthtime.getTime(), // creation time
            last_accessed: stats.atime.getTime(), // last access time
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory(),
        };
    }
    return metadata;

}

async function read_metadata_from_file(filepath){
    const stats = await fs.promises.stat(filepath);
    const filename = path.basename(filepath);
    return {
        [filename]: {
            size: stats.size,
            last_edited: stats.mtime.getTime(),
            created: stats.birthtime.getTime(),
            last_accessed: stats.atime.getTime(),
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory(),
        }
    };
}


module.exports = {
    create_random_token,
    default_router,
    extract_basic_call_data,
    favicon,
    gate_guard,
    get_cookie_value_from_req,
    get_parameter_from_url_string,
    hash_string,
    pipe_file_from_filesys,
    pipe_file_from_filesys_compressed,
    pipe_data_to_filesys,
    r_bits,
    read_metadata_from_file,
    read_metadata_from_folder_files,
    receive_request_post_data,
    remove_trailing_ipv6,
    requestlink_auth_follow,
    requestlink_auth_post,
    reply_error_while_processing,
    reply_request_throttled,
    reply_resource_not_found,
    reply_site_in_construction,
    sleep,
    template_error_page,
    template_in_construction_page
}

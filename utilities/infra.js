const fs = require("fs");
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
async function pipe_file_from_filesys(res, http_reply_code, source_path, content_type) {
    const absolutePath = path.resolve(__dirname, "..", source_path);
    console.log("piping files "+absolutePath);
    const readStream = fs.createReadStream(absolutePath);
    
    readStream.on('error', (err) => {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found or error reading file.");
        console.error("Error piping file:", err);
    });

    res.writeHead(http_reply_code, { "Content-Type": content_type });
    readStream.pipe(res);
    readStream.on('end', () => {
        console.log("hard drive pipe of " + absolutePath + " concluded");
    });
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
function reply_error_while_processing(req,res){
    res.writeHead(500, {"Content-Type": "text/html"});
    res.end(template_error_page());
}
function reply_request_throttled(req,res){
    res.writeHead(403, {"Content-Type": "text/plain"});
    res.end("403 Forbidden - Your access has been temporarily restricted. Please try again later.");
}
function reply_resource_not_found(req,res){
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end("404 Not Found - The requested resource could not be found.");
}
function reply_site_in_construction(req,res){
    res.writeHead(503, { "Content-Type": "text/html" });
    res.end(template_in_construction_page());
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
            <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <rect width="400" height="300" fill="#f0f4f8"/>

            <!-- Desk -->
            <rect x="50" y="200" width="300" height="80" fill="#8b5e3c" rx="10"/>
            <rect x="50" y="190" width="300" height="10" fill="#6b4e31"/>

            <!-- Computer Monitor -->
            <rect x="200" y="120" width="100" height="60" fill="#333" rx="5"/>
            <rect x="205" y="125" width="90" height="50" fill="#87ceeb"/>
            <!-- Screen content (simplified code) -->
            <rect x="210" y="130" width="80" height="40" fill="#000" opacity="0.3"/>
            <text x="230" y="155" font-family="Arial" font-size="10" fill="#0f0">0101</text>

            <!-- Monitor Stand -->
            <rect x="240" y="180" width="20" height="20" fill="#555"/>
            <rect x="230" y="200" width="40" height="5" fill="#555"/>

            <!-- Keyboard -->
            <rect x="210" y="210" width="80" height="20" fill="#222" rx="3"/>
            <rect x="215" y="213" width="70" height="14" fill="#444" rx="2"/>

            <!-- Cat Body -->
            <ellipse cx="150" cy="180" rx="40" ry="50" fill="#ff9900"/>
            <!-- Cat Head -->
            <circle cx="150" cy="120" r="30" fill="#ff9900"/>
            <!-- Ears -->
            <polygon points="135,90 145,70 155,90" fill="#ff9900"/>
            <polygon points="145,90 155,70 165,90" fill="#ff9900"/>
            <polygon points="138,90 145,75 152,90" fill="#ffe6b3"/>
            <polygon points="148,90 155,75 162,90" fill="#ffe6b3"/>
            <!-- Eyes -->
            <circle cx="142" cy="115" r="5" fill="#fff"/>
            <circle cx="158" cy="115" r="5" fill="#fff"/>
            <circle cx="142" cy="115" r="2" fill="#000"/>
            <circle cx="158" cy="115" r="2" fill="#000"/>
            <!-- Nose and Whiskers -->
            <circle cx="150" cy="125" r="2" fill="#ff6666"/>
            <line x1="140" y1="125" x2="130" y2="120" stroke="#fff" stroke-width="2"/>
            <line x1="140" y1="127" x2="130" y2="127" stroke="#fff" stroke-width="2"/>
            <line x1="160" y1="125" x2="170" y2="120" stroke="#fff" stroke-width="2"/>
            <line x1="160" y1="127" x2="170" y2="127" stroke="#fff" stroke-width="2"/>
            <!-- Tail -->
            <path d="M110,200 Q90,220 100,240" stroke="#ff9900" stroke-width="10" fill="none"/>

            <!-- Paws -->
            <ellipse cx="130" cy="195" rx="10" ry="8" fill="#ffe6b3"/>
            <ellipse cx="170" cy="195" rx="10" ry="8" fill="#ffe6b3"/>
            <!-- Paw holding screwdriver -->
            <ellipse cx="180" cy="170" rx="10" ry="8" fill="#ffe6b3" transform="rotate(-30 180 170)"/>
            <rect x="175" y="155" width="5" height="20" fill="#666" transform="rotate(-30 180 170)"/>
            <rect x="172" y="150" width="11" height="5" fill="#ff0000" transform="rotate(-30 180 170)"/>

            <!-- Tools on Desk -->
            <circle cx="80" cy="220" r="5" fill="#999"/> <!-- Bolt -->
            <rect x="90" y="215" width="10" height="10" fill="#666" transform="rotate(45 95 220)"/> <!-- Wrench -->
            <path d="M100,225 L110,215 L120,225" fill="#33cc33"/> <!-- Circuit board piece -->

            <!-- Floor -->
            <rect x="0" y="280" width="400" height="20" fill="#d3d3d3"/>
            </svg>
            <h2 style="text-align:center; font-family:sans-serif; color:#333;">An error has been experienced while servicing your request.</h2>
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
            <h2 style="text-align:center; font-family:sans-serif; color:#333;">Page Under Construction</h2>
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
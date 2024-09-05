Hello

My name is Demian, I am (1987 - present year) years old self taught programmer and this software is my main project.

I aim to become a fullstack engineer / cloud architect as to be able to field significant solutions for a variety of problems.

Ill be happy to address any inquiries regarding this project at the email demian@demian.app

This particular element is intended to be a really lightweight webserver that queries a google script back end at startup to receive the contents lists.

Static storage is meant to be managed in blob buckets, with CORS for the domains serviced.

Future idea is to evolve into go binaries, and/or create containers and deploy with Load Balancer and Cloud Run vs the current Compute Engine + NodeJS.

Current objective is to execute an efficient structure of minimal tools that allows for complex website/s setup while ussing assets found in google drive.

Project codename is plp: personal laboratory portfolio, it is intended to be both a testing ground and a portfolio for future projects. 


Tech Stack

    Platform: GCP Compute Engine
    OS: Debian
    Runtime: NodeJS
    HTTPS Certificates: Certbot
    Site management: Google Drive
    Object Storage: GCP Cloud Bucket

Notes on tech choices:

    Platform: Emulated core GCP Compute Engine (Free Tier)
        Selected due to the always free element, domain cost is reduced to yearly registration. 

    OS: Debian
        Selected due to balance between minimality and community support. 
    
    Runtime: NodeJS
        Selected due to single thread efficiency (Hardware was originally a single emulated core), and client threadlessness.

    HTTPS Certificates: certbot
        Selected due to cost 0, and also, very user friendly. 

    Site management: Google Drive
        Selected due to familiarity in its operation from an ever growing community and frontal cost 0 vs alternatives. 

    Object Storage: GCP Cloud Bucket
        Selected due to reliability and independence from emulated instances local storage. Used sparingly to remain within free tier usage. 

General notes:

    Intended flow is to:

    0.- Start
    1.- Request tooling and contents
    2.- Read certificates
    4.- Receive tooling and contents
    5.- Start serving

    Update flow is inteded to (while serving):

    0.- Request contents
    1.- Update existing reference with updated contents

    Contents are:

    0.- Serving Tools:
        Any code related to server operation, serverside html construction, https management etc...

    1.- Content Structure:
        A big json where all domains and valid resources are listed along with servicing details for them

    2.- Asset map:
        An asset source path / website url identifier to make public facing https servers that can boot up and access shared resources on backend without usage of local storage

The idea is to "set and forget" the server up until next development stage, when its resources stop being sufficient to manage the traffic of the multiple serviced domains. 
At that stage, situation control will be to upgrade the virtualized hardware in a temporary fashion, or extract the better performing site to an individual server.
Such a traffic success will make valuable to start working with a load balancer and a dynamic number of servers. However, this will be tailored to performance.

Content management will happen in Google Drive, where interfaces are easier to build and there is extensive storage, access control and organizational tools.
The cloud bucket is intended to host the public static data selected by the application users. 
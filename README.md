# TradeLens SIP Sample Webhook
This is a sample webhook which demonstrates how a user could receive events from a TradeLens subscription.  This sample utilizes a
shared secret for added security.

You will need to create a subscription in TradeLens using this webhook.  The subscription
REST API is documented with swagger [here](https://platform.tradelens.com/documentation/swagger/?urls.primaryName=Event%20Subscription%20API).  The shared secret specified during subscription creation
must match the value set in the `config/env.json` file.  The default setting
for `sharedSecret` is `theSharedSecret`

Take a moment to read the subscription implementation notes and to familiarize yourself with its REST APIs.  In particular look
at the notes regarding the shared secret while looking at the sample webhook's controller
code for verifying the shared secret signature.

## Running the sample webhook
Prerequisites:
 - install NodeJS v7.1.0

Run the following commands:
 - `git clone https://github.com/ibmgtd/sip-sample-webhook-node.git`
 - Set up your certificate.  See the section below for details.
 - Inspect and change config in config/env.json
    - **port** - server port
    - **sharedSecretsecret** - shared secret value used in subscriptions
    - **certificateDirectory** - directory containing the certificate from the previous step
 - To install npm modules, run `npm install`
 - Start server using `npm start`
 - Validate running by performing HTTP `GET` on [http://localhost:8085/events](http://localhost:8085/events)

## Set up your Certificate

TradeLens only communicates with webhooks via HTTPS.  Therefore, a certificate is required.  There are several ways to do this, and they may be unique depending on your webhook application's platform.  

Below is an example of how create your certificate with "Let's Encrypt" and set it up on Centos Linux, where `foo.sample.com` is the DNS name of your server machine.  Run the commands below.  The `certbot` command will get the certificate files and put them in a directory named like "/etc/letsencrypt/live/foo.sample.com/".

 - `yum --enablerepo=extras install epel-release`
 - `yum install certbot`
 - `certbot --version`  ## Just to confirm that it's installed
 - `certbot certonly --standalone --preferred-challenges http -d foo.sample.com` 

Regardless of how you create your certificate, identify the location where the resulting files are placed.  That location must be updated in the config/env.json file.  The following files are expected to reside in that location.
 - privkey.pem
 - cert.pem
 - fullchain.pem

## Create a Subscription
Create the subscription using [https://platform.tradelens.com/documentation/swagger/?urls.primaryName=Event%20Subscription%20API](https://platform.tradelens.com/documentation/swagger/?urls.primaryName=Event%20Subscription%20API).  Use one of the `POST` APIs listed to create a subscription.

The webhook and shared secret correspond to this sample.

## Send an Event
To send an event that is received by the webhook, a Start Transport Equipment Tracking event will need to be sent first to the platorm.  The REST API is documented with swagger and can be viewed at [https://platform.tradelens.com/documentation/swagger/?urls.primaryName=Event%20Publish%20API](https://platform.tradelens.com/documentation/swagger/?urls.primaryName=Event%20Publish%20API).  Note
that if a country was used in the created subscription, either the export or import country will need to include that country.  If a port was
used, then the route must include the port that was used in the subscription.  For example, if the subscription was set up
for country 'US', either the export or import country must be 'US' for events to flow to the subscription created.

## See the Events
To see the events received by this webhook, perform an HTTP `GET` on [http://localhost:8085/events](http://localhost:8085/events)

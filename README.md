# SIP Sample Webhook
This is a sample webhook which demonstrates how a user could receive events from SIP subscriptions.  This sample utilizes a
shared secret for added security.

You will need to create a subscription in SIP using this webhook.  The subscription
REST API is documented with swagger [here](http://sip-subscription-integration.mybluemix.net/swagger-ui.html).  The shared secret specified during subscription creation
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
 - Inspect and change config in config/env.json
    - **port** - server port
    - **sharedSecretsecret** - shared secret value used in subscriptions
 - To install npm modules, run `npm install`
 - Start server using `npm start`
 - Validate running by performing HTTP `GET` on [http://localhost:8085/events](http://localhost:8085/events)

## Create a Subscription
Create the subscription using [http://sip-subscription-integration.mybluemix.net/swagger-ui.html](http://sip-subscription-integration.mybluemix.net/swagger-ui.html).  See
the 'Create a subscription' section.  Below is a sample message body to use with the `POST` request:
```json
{
    "delegationId": "ZvBW9vMqxzHZlCTOPTmb3xhr59ZnOSPK",
    "webhook": {
        "sharedSecret": "theSharedSecret",
        "uri": "http://ipaddress:8085/events/"
    }
}
```

Note the delegationId corresponds to the shipment you are subscribing to.  The webhook and shared secret correspond to this sample.

## Send an Event
To send an event that is received by the webhook, a Start Container Tracking E278 event will need to be sent first over the pipeline.  The pipeline REST API is documented with swagger and can be viewed at [http://sip-pipeline-integration.mybluemix.net/swagger-ui.html](http://sip-pipeline-integration.mybluemix.net/swagger-ui.html).  Note
that if a country was used in the created subscription, either the export or import country will need to include that country.  If a port was
used, then the route must include the port that was used in the subscription.  For example, if the subscription was set up
for country 'US', either the export or import country must be 'US' for events to flow to the subscription created.

## See the Events
To see the events received by this webhook, perform an HTTP `GET` on [http://localhost:8085/events](http://localhost:8085/events)

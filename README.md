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
 - Inspect and change config in config/env.json
    - **port** - server port
    - **sharedSecretsecret** - shared secret value used in subscriptions
 - To install npm modules, run `npm install`
 - Start server using `npm start`
 - Validate running by performing HTTP `GET` on [http://localhost:8085/events](http://localhost:8085/events)

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

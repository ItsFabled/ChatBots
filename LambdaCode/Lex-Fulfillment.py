# Lex-Lambda docs: https://docs.aws.amazon.com/lexv2/latest/dg/lambda.html

def responsePreparation(intent, responseBlock) -> dict:
    responseBlock = responseBlock.strip()
    response = {
        "sessionState": { # sessionState updates the state of the intent fulfillment
            "dialogAction": {
                "type": "Close"
            },
            "intent": {
                "name": intent,
                "state": "Fulfilled"
            }
        },
        "messages": [{ # messages are the responses that the bot will return to the user
            "contentType": "PlainText",
            "content": responseBlock
        }]
    }
    return response

def fallbackResponse(intent) -> dict:
    responseBlock = "I'm sorry, I'm not sure how to answer that. Please try again."
    response = responsePreparation(intent, responseBlock)
    # TODO - Log the intent that triggered the fallback response in CW
    return response

def fulfillGreeting(intent) -> dict:
    responseBlock = "Hello, I am Lexbot. How can I help you?"
    response = responsePreparation(intent, responseBlock)
    return response

def fulfillExplanation(intent) -> dict:
    responseBlock = "I am a chatbot intended to answer student queries and your course. \
    I answer questions quickly and reliably, I am available 24/7. \
    I can help you with course information, policies, assignment deadlines, and more. \
    Ask me a question and I'll try my best to help you!"
    response = responsePreparation(intent, responseBlock)
    return response

def lambda_handler(event, contex) -> dict: # Control originates from this function when fulfillment is triggered
    intent = event['sessionState']['intent']['name']
    invocationSource = event['invocationSource']
    # Prints are not returned to the chatbot, they are printed to CloudWatch logs
    print(f"Received intent: {intent}")
    print(f"Received invocationSource: {invocationSource}")

    if intent == "Greetings":
        response = fulfillGreeting(intent)
    elif intent == "Explanation":
        response = fulfillExplanation(intent)

    # else:
        # Fallback response
        # Raise for investigation


    print(response)
    return response
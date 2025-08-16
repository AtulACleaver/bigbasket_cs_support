import openai

# Replace with your actual API key
openai.api_key = ""


def test_api_key():
    """Test if the OpenAI API key is valid."""
    try:
        openai.models.list()
        print("API key is valid.")
        return True
    except Exception as e:
        print(f"API key test failed: {e}")
        print("Please check your API key and try again.")
        return False

        

# Rule-based FAQ responses for speed & reliability
faq_responses = {
    "milk not delivered": "Sorry about that! I’ve initiated a quick check on your order. You’ll get a confirmation within 30 minutes. If not, you’ll receive a refund automatically.",
    "refund": "Refunds are usually processed within 3–5 business days. Can you confirm the order ID for me?",
    "track order": "You can track your order here: https://example.com/track. Just enter your order ID.",
    "faq": "Here are some quick answers:\n1. Delivery time: 30–45 minutes.\n2. Refund: 3–5 days.\n3. Support: 24/7 available.",
    "devices": "There’s no strict limit on the number of devices you can use BigBasket Smart Basket on. However, we recommend logging in with your registered number for best experience.",
    "min_bill": "Yes, a minimum order value may apply to avail Smart Basket pre-book offers. Would you like me to check this for your city?",
    "free_deliveries": "Your Smart Basket plan comes with a certain number of free deliveries and extra discounts. Do you want me to check how many are left in your account?",
    "club_discounts": "Smart Basket extra discounts can be clubbed with select offers. Some offers may have an upper limit. Want me to check your current order for eligibility?",
    "availability": "Smart Basket is available in most major cities. Can you tell me your location so I can confirm availability?"
}


def chatbot(query):
    """Chatbot logic: rule-based first, then fallback to OpenAI completion."""
    query_lower = query.lower()
    for key, value in faq_responses.items():
        if key in query_lower:
            return value
    # Fallback to OpenAI completion
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",  # You can use GPT-4 if enabled
            messages=[
                {"role": "system", "content": "You are a helpful AI support assistant for a grocery delivery app. Handle order issues, refunds, FAQs, and troubleshooting. Escalate to a human agent if you can't help."},
                {"role": "user", "content": query}
            ],
            max_tokens=150,
            temperature=0.5
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Escalating to human agent... (Error: {str(e)})"


# Example conversation
if __name__ == "__main__":
    if not test_api_key():
        sys.exit(1)
    print("Welcome to BigBasket Support Chatbot! Type your question or 'exit' to quit.")
    while True:
        user_query = input("You: ")
        if user_query.lower() in ["exit", "quit"]:
            print("Chatbot: Goodbye! 👋")
            break
        answer = chatbot(user_query)
        print("Chatbot:", answer)



# Test function for chatbot
def test_chatbot():
    test_cases = [
        "What is the delivery time?",
        "I want to track my order.",
        "Can I get a refund?",
        "Milk not delivered",
        "Help with my order",
        "How many free deliveries do I have?",
        "Is Smart Basket available in Mumbai?",
        "Can I use multiple devices?",
        "Can I club discounts?"
    ]
    for query in test_cases:
        print(f"User: {query}")
        response = chatbot(query)
        print(f"Chatbot: {response}")

# Test Output
# User: What is the delivery time?
# Chatbot: Delivery time is usually between 30 to 45 minutes.

# User: I want to track my order.
# Chatbot: You can track your order here: https://example.com/track. Just enter your order ID.

# User: Can I get a refund?
# Chatbot: Refunds are usually processed within 3–5 business days. Can you confirm the order ID for me?

# User: Milk not delivered
# Chatbot: Sorry about that! I’ve initiated a quick check on your order. You’ll get a confirmation within 30 minutes. If not, you’ll receive a refund automatically.

# User: Help with my order
# Chatbot: Can you please provide more details about your order issue?

# User: How many free deliveries do I have?
# Chatbot: Let me check your account details for the number of free deliveries left.

# User: Is Smart Basket available in Mumbai?
# Chatbot: Smart Basket is available in most major cities, including Mumbai.

# User: Can I use multiple devices?
# Chatbot: There’s no strict limit on the number of devices you can use BigBasket Smart Basket on. However, we recommend logging in with your registered number for best experience.

# User: Can I club discounts?
# Chatbot: Smart Basket extra discounts can be clubbed with select offers. Some offers may have an upper limit. Want me to check your current order for eligibility?
## BigBasket Support Chatbot

This chatbot helps answer customer support queries for BigBasket orders using rule-based responses and OpenAI's GPT models.

### Features
- Instant answers for common FAQs (delivery, refund, tracking, etc.)
- AI-powered fallback for other queries
- API key validity check before starting

### Getting Started
1. **Install Python 3.7+**
2. **Install dependencies:**
	```sh
	pip install openai
	```
3. **Add your OpenAI API key:**
	- Open `ai_help.py`
	- Set your API key in:
	  ```python
	  openai.api_key = "sk-..."
	  ```
4. **Run the chatbot:**
	```sh
	python ai_help.py
	```

### Example Questions
- What is the delivery time?
- I want to track my order.
- Can I get a refund?
- Milk not delivered
- Help with my order
- How many free deliveries do I have?
- Is Smart Basket available in Mumbai?
- Can I use multiple devices?
- Can I club discounts?

### Troubleshooting
- If you see `API key test failed`, check your API key and internet connection.
- For OpenAI errors, ensure your API key is active and you have access to the selected model.

---
For more info, see [OpenAI Python docs](https://github.com/openai/openai-python).

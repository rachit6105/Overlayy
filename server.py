from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/track', methods=['POST'])
def track():
    data = request.get_json()
    print(f"Received interaction: {data}")
    # Here you can process the data, save it to a database, etc.
    return jsonify({"status": "success"}), 200

@app.route('/content', methods=['POST'])
def content():
    data = request.get_json()
    text_content = '\n'.join(data.get('text', []))
    image_urls = data.get('images', [])

    # Save the text content
    with open('visible_text_content.txt', 'w', encoding='utf-8') as text_file:
        text_file.write(text_content)
    
    # Save the image URLs
    with open('visible_images.txt', 'w', encoding='utf-8') as image_file:
        for url in image_urls:
            image_file.write(url + '\n')

    print("Visible text content and image URLs received and saved.")
    return jsonify({"status": "success"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

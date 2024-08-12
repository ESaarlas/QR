import qrcode
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    data = request.json
    profile_url = f"https://your-github-pages-site.com/account?name={data['name']}&email={data['email']}"
    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(profile_url)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    img_path = f"./data/{data['name']}_qr.png"
    img.save(img_path)
    
    return jsonify({"qr_code": img_path})

if __name__ == '__main__':
    app.run(debug=True)

<h1 align="center">
    Submento<br>
    <img src="https://img.shields.io/twitter/follow/legitisadev?style=flat&label=%40legitisadev&logo=twitter&color=0bf&logoColor=fff" alt="Twitter" />
    <img src="https://img.shields.io/badge/License-AGPL3.0-orange">
    <img src="https://img.shields.io/badge/Contributions-Open-green">
</h1>


## Introduction 👔
Submento is a web application that empowers users to upload videos, automatically generate subtitles using Whisper AI, and seamlessly create video segments. Whether you're a content creator, educator, or business professional, Submento makes the process of video enhancement and transcription a breeze.

## Features ✨

- **Video Upload**: Easily upload your videos to the Submento platform.
- **Automatic Subtitle Generation**: Leverage the power of Whisper AI to automatically generate accurate subtitles for your videos.
- **Video Segmentation**: Quickly create video segments to enhance content organization and user experience.
- **Beautiful User Interface**: Enjoy a clean and intuitive user interface for a seamless experience.
- **Export Options**: Download your subtitles and segments.
- **Recent Activies**: Track all your previously processed videos, export subtitles and segments anytime.

## Snapshots


### Minimal & User-friendly dashboard
![image](https://github.com/legit-programmer/submento/assets/66078215/c42b4f04-0906-4c77-8249-132cafe388a6)
![image](https://github.com/legit-programmer/submento/assets/66078215/62c94274-911a-4994-a024-e28018897a58)
![image](https://github.com/legit-programmer/submento/assets/66078215/79c7dd05-8d52-4f39-b660-c8f008b72625)

### We store your past activites!
![image](https://github.com/legit-programmer/submento/assets/66078215/17755e11-e935-4ade-b991-51abb662300a)



## Tech Stack ⚙

- [React + Typescript](https://react.dev/) : Frontend (chunk uploads, fetching, validations etc)
- [Django](https://www.djangoproject.com/) : Backend (video processing, speech recognition using Whisper, subtitle file generation etc)
- [Supabase](https://supabase.com/) : Database, Storage
- [OpenAI Whisper](https://openai.com/research/whisper) : Speech recognition.

## Getting Started 👩‍💻

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/legit-programmer/submento
    ```

2. **Install Dependencies:**

    ```bash
    cd submento
    cd app
    npm install
    pip install -r ../server/requirements.txt
    ```
3. **Configure .env files in both app and server directory:**
   ```check .env.example in respective directories```
4. **Before running the app make sure you configure your [supabase project](https://supabase.com) as follows:**
   
   ![image](https://github.com/legit-programmer/submento/assets/66078215/f3859d9a-2da2-4390-95ae-b09822fbf81b)

    Next, create a bucket called "videos", add a folder named "subtitles" and then you are good to go!
  
5. **Run the App:**

    ```bash
    npm run dev
    python../server/manage.py runserver
    ```

6. **Access Submento:**

    Open your browser and navigate to `http://localhost:5173` to start using Submento.

7. If you face any issues, feel free to ask questions in our discussions.

## Usage 💅

1. **Upload Your Video:**
   
   Click on the "Upload Video" button to select and upload your video file.

2. **Subtitle Generation:**

   Submento will automatically generate subtitles for your video using Whisper AI.

3. **Create Video Segments:**

   Use the intuitive interface to create video segments based on your preferences.

4. **Export Your Data:**

   Download the subtitles and segments for your intended use.

## Contributing💖

We welcome contributions from the community to make Unisum even better. If you would like to contribute, please follow these guidelines:

1. Fork the repository and create a new branch.

2. Make your changes and ensure they align with the project's coding style and conventions.

3. Write clear and concise commit messages.

4. Test your changes thoroughly.

## License 📃

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0) - see the [LICENSE](LICENSE) file for details.



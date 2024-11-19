"use server"
import { sign } from "jsonwebtoken";
import styles from "./page.module.css";
import Link from "next/link";
import Input from "./input";
function generateUniqueFileName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  const fileName = `file_${formattedDate}.mp4`;
  return fileName;
}
export const GenerateTokenFunction = async (m3u8url) => {
  const postData = {
    image_url: m3u8url,
    bucket_name: process.env.S3_BUCKET_NAME,
    s3_key: generateUniqueFileName(),
    access_id: process.env.S3_ACCESS_ID,
    secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
    region_name: process.env.S3_REGION_NAME
  }
  const options = { expiresIn: '1h' };
  const token = sign(postData, process.env.JWT_SECRET_KEY, options);
  return token;
}
export default async function Home() {
  const data = [
    {
      title: "M3U8 Video Downloader – Your Ultimate Solution for Seamless Video Downloading",
      subtitle: null,
      description: null
    },
    {
      title: null,
      subtitle: null,
      description: "In today's fast-paced digital world, video content plays a critical role in how we consume information, entertainment, and education. Platforms such as YouTube, Vimeo, and various live streaming services use M3U8 files to deliver video content efficiently. However, there are times when users may wish to download these videos for offline viewing, especially when internet connectivity is slow or unavailable. To address this need, we have developed an intuitive and powerful M3U8 Video Downloader tool designed to simplify the process of downloading M3U8 video files quickly, efficiently, and without any hassle."
    }, {
      title: null,
      subtitle: null,
      description: "The M3U8 Video Downloader is a web-based platform that allows users to download high-quality video content from M3U8 streaming URLs, giving them the flexibility to store and access their favorite videos whenever they want. Whether you’re looking to download a live stream, a video from a video-on-demand service, or content from a private M3U8 URL, our tool is capable of handling it all."
    }, {
      title: "What is M3U8?",
      subtitle: null,
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "Before we dive deeper into how our M3U8 Video Downloader works, let’s understand what M3U8 is. M3U8 is a multimedia playlist file format used by the HTTP Live Streaming (HLS) protocol. It’s commonly used by streaming services to deliver content over the internet. The format is widely adopted by platforms that need to deliver video content to users in a streaming fashion, where the video is segmented into small chunks and delivered progressively."
    }, {
      title: null,
      subtitle: null,
      description: "These M3U8 files don’t contain the video itself but point to a series of small video chunks (usually .ts files) that make up the whole video. While streaming offers great flexibility, it does not always offer the same experience as having a downloadable copy. This is where our M3U8 Video Downloader comes in, enabling users to convert M3U8 streaming links into downloadable videos that they can keep on their devices."
    }, {
      title: "Key Features of M3U8 Video Downloader",
      subtitle: null,
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "Our M3U8 Video Downloader offers several essential features that make it the best tool for downloading M3U8 video content. These features are designed to provide a seamless and convenient experience for users"
    }, {
      title: null,
      subtitle: "1. Fast and Reliable Downloads",
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "We understand the frustration of slow download speeds and interruptions during video downloads. Our tool is optimized to provide high-speed downloads, ensuring you can save your videos in the shortest time possible. The downloader uses intelligent algorithms to bypass unnecessary delays and ensures that your video files are downloaded efficiently without any quality loss."
    }, {
      title: null,
      subtitle: "2. Support for Multiple M3U8 Sources",
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "Whether you’re dealing with live streams, on-demand content, or videos from any other platform that uses M3U8 links, our downloader supports a wide range of M3U8 URLs. This versatility ensures that you can download almost any video that uses the HLS streaming protocol."
    }, {
      title: null,
      subtitle: "3. High-Quality Video Downloads",
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "Our M3U8 downloader retains the video’s original quality during the download process. You can be confident that the videos you download will maintain their resolution, bitrate, and overall quality, ensuring a satisfying playback experience when viewed offline."
    }, {
      title: null,
      subtitle: "4. Easy-to-Use Interface",
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "The tool is designed to be user-friendly, with a simple, intuitive interface that anyone can navigate, regardless of technical expertise. You just need to paste the M3U8 URL, and the tool will handle the rest. With a few clicks, you’ll have your video file ready for offline use."
    }, {
      title: null,
      subtitle: "5. No Software Installation Required",
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "The best part about our M3U8 Video Downloader is that it’s completely web-based. You do not need to download or install any software to use it. This makes it ideal for users who want to quickly download videos without dealing with complex installations or system compatibility issues."
    }, {
      title: null,
      subtitle: "6. Free to Use",
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "Our M3U8 Video Downloader is completely free to use, providing you with an unlimited number of downloads without requiring you to pay for a subscription or premium membership. We believe that access to video content should be easy and affordable for everyone."
    }, {
      title: null,
      subtitle: "7. Cross-Device Compatibility",
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "Whether you’re using a Windows PC, Mac, or a mobile device, our M3U8 Video Downloader works seamlessly across multiple platforms. This ensures that you can download and store your videos on any device you prefer."
    }, {
      title: null,
      subtitle: "8. Multi-Format Downloads",
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "Our tool also supports downloading in various video formats. While most M3U8 links come with .ts files, our downloader can convert these files into more accessible formats like MP4, MKV, and more, depending on your preferences. This makes the videos compatible with a wide range of devices and media players."
    }, {
      title: "How M3U8 Video Downloader Works",
      subtitle: null,
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "Using the M3U8 Video Downloader is incredibly simple. Just follow these easy steps, and you’ll have your desired video downloaded in no time:"
    }, {
      title: null,
      subtitle: "Step 1: Find the M3U8 URL",
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "First, you need to find the M3U8 URL of the video you want to download. This URL is typically provided by streaming services or can be accessed through browser developer tools."
    }, {
      title: null,
      subtitle: "Step 2: Paste the URL into the Downloader",
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "Once you have the M3U8 URL, go to our M3U8 Video Downloader webpage, and paste the URL into the designated input field. Click on the “Download” button."
    }, {
      title: null,
      subtitle: "Step 3: Choose Your Desired Format and Quality",
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "Depending on the video, you may have options to select the resolution or format in which you want to download the video. Choose your preferred settings."
    }, {
      title: null,
      subtitle: "Step 4: Download the Video",
      description: null
    }, {
      title: null,
      subtitle: null,
      description: "After selecting your preferred format and quality, click the “Download” button again, and the video will start downloading to your device. You can monitor the progress and wait until the download is complete."
    }
  ]
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>M3U8 Downloader</h1>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="https://www.iplust.in/">Company</Link>
          <Link href="#">About</Link>
        </nav>
      </header>
      <Link
        href="https://www.iplust.in/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.githubButton}
      >
        <span>Powered by <strong>I Plus T Solution</strong> →</span>
      </Link>
      <main className={styles.main}>
        <h2 className={styles.subtitle}>Download M3U8<br />Video Easily</h2>
        <p className={styles.description}>
          Our tool allows you to securely download m3u8 video files directly to your device. Simple, fast, and easy to use.
        </p>
      </main>
      <Input />
      <section className={styles.statsSection}>
        <h2 className={styles.statsTitle}>Used and trusted by a growing community</h2>
        <div className={styles.statsContainer}>
          <div className={styles.stat}>
            <p className={styles.statNumber}>2.6K</p>
            <p className={styles.statLabel}>Files Downloaded</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statNumber}>3.9K</p>
            <p className={styles.statLabel}>Files Processed</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statNumber}>376</p>
            <p className={styles.statLabel}>Suggest Us</p>
          </div>
        </div>
      </section>
      <section className={styles.alldescription}>
        {data.map((item) => {
          if (item.description) {
            return <p>{item.description}</p>
          } else if (item.title) {
            return <h1>{item.title}</h1>
          } else if (item.subtitle) {
            return <h2>{item.subtitle}</h2>
          }
        })}
      </section>
      <footer className={styles.footer}>
        <p className={styles.footerText}>Created by <Link href="https://www.iplust.in/">I Plus T Solution</Link></p>
      </footer>
    </div>
  );
}

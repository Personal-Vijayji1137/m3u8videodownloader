"use client"
import styles from "./page.module.css";
import Swal from 'sweetalert2'
import { parse, types, stringify } from 'hls-parser';
import { useEffect, useState } from "react";
import { GenerateTokenFunction } from "./page";
export default function Input() {
    const [progress, setProgress] = useState(null);
    const [url, setURL] = useState("");
    const [playlist, setplaylist] = useState([]);
    const [logMessages, setLogMessages] = useState("Please Wait ...");
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadLink, setdownloadLink] = useState(null);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    function getQualityLabel(resolution) {
        if (!resolution) return 'Unknown';
        const { height } = resolution;
        if (height <= 240) return '240p';
        if (height <= 360) return '360p';
        if (height <= 480) return '480p';
        if (height <= 720) return '720p';
        if (height <= 1080) return '1080p';
        if (height <= 1440) return '1440p';
        return '2160p (4K)';
    }
    const DownloadFile = async (e) => {
        e.preventDefault();
        if (url.endsWith(".m3u8")) {
            const response = await fetch(url);
            const text = await response.text();
            const parsed = parse(text);
            if (parsed.isMasterPlaylist) {
                let formats = parsed.variants.map((variant) => ({
                    resolution: variant.resolution ? `${variant.resolution.width}x${variant.resolution.height}` : 'Unknown Resolution',
                    bandwidth: variant.bandwidth,
                    quality: getQualityLabel(variant.resolution),
                    uri: new URL(variant.uri, url).toString(),
                })).filter((format) => format.resolution !== 'Unknown Resolution');
                formats.sort((a, b) => a.bandwidth - b.bandwidth);
                setplaylist(formats);
            } else {
                DownloadOnServer(url);
            }
        } else {
            Toast.fire({
                icon: "error",
                title: "M3U8 video url only ..."
            });
        }
    }
    const DownloadOnServer = async (m3u8url) => {
        const token = await GenerateTokenFunction(m3u8url);
        const roomName = token.split(".")[1];
        const socket = new WebSocket(`wss://iplustsolution-m3u8videodownloader.hf.space/ws/${roomName}`);
        setProgress(1);
        socket.onmessage = (event) => {
            const jsdata = JSON.parse(event.data)
            setLogMessages(jsdata.message);
            setProgress(jsdata.progress);
        };
        setIsDownloading(true);
        try {
            const response = await fetch("https://iplustsolution-m3u8videodownloader.hf.space", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch updates");
            }
            const data = await response.json();
            setdownloadLink(data);
        } catch (error) {
            console.log("Error fetching updates:", error);
        } finally {
            setIsDownloading(false);
        }
    }
    return <>
        <div className={styles.ContainerofInputer}>
            <form className={styles.downloadContainer} onSubmit={DownloadFile}>
                <input
                    type="url"
                    className={styles.downloadInput}
                    placeholder="Enter m3u8 URL ..."
                    value={url}
                    onChange={(e) => { setURL(e.target.value) }}
                />
                <button type="submit" className={styles.downloadButton} disabled={isDownloading}>Download</button>
            </form>
            {playlist.length > 0 && (
                <div className={styles.playlistContainer}>
                    <h3>Select Video Quality</h3>
                    <div className={styles.playlist}>
                        {playlist.map((format, index) => (
                            <div key={index} className={styles.playlistItem}>
                                <span>{format.quality} ({format.resolution})</span>
                                <button onClick={() => { DownloadOnServer(format.uri); setplaylist([]) }} className={styles.downloadButton} disabled={isDownloading && playlist.length}>Start Download</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
        {progress && <ProgressBar progress={progress} text={logMessages} />}
        {downloadLink && (
            <div className={styles.projectContainer}>
                <div className={styles.playlistContainer}>
                    <h3>Your Download Link is Ready</h3>
                    <div className={styles.playlist}>
                        <div className={styles.playlistItem}>
                            <span>Your Download File Size is : {downloadLink.file_size_mb}MB</span>
                            <a href={downloadLink.presigned_url} target="_blank">Click to Download Your File</a>
                        </div>
                    </div>
                </div>
            </div>
        )}
        <script type='text/javascript' src='//abberantdisheartenbandage.com/0f/10/03/0f1003b51551fc2a30e0df90f8558753.js'></script>
        <script async="async" data-cfasync="false" src="//abberantdisheartenbandage.com/e58ce0f4dfcb3c0df3fcde599aeff023/invoke.js"></script>
    </>
}


const ProgressBar = ({ progress, text }) => {
    return (
        <div className={styles.projectContainer}>
            <div className={styles.projectTitle}>{text}</div>
            <div className={styles.progressBarContainer}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {progress}%
                </div>
            </div>
        </div>
    );
};
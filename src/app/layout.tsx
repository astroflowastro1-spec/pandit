import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Providers from "@/components/providers/Providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mere Pandit Ji | Premium Spiritual Journey",
  description: "Experience the divine with premium spiritual services, puja, and temple darshan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} scroll-smooth`}
    >
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1306050034750332');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="antialiased min-h-screen flex flex-col relative selection:bg-brand-primary selection:text-white preloader-active">
        {/* Fullscreen Video Preloader */}
        <div id="global-preloader" style={{
          position: 'fixed',
          inset: '0',
          zIndex: 9999,
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.7s ease',
        }}>
          <video
            id="preloader-video"
            src="/loding video.mp4"
            autoPlay
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Inline script: fade out when video ends, 8s safety fallback */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function fadeOutLoader() {
                  var loader = document.getElementById('global-preloader');
                  if (!loader) return;
                  loader.style.opacity = '0';
                  document.body.classList.remove('preloader-active');
                  setTimeout(function() {
                    loader.style.display = 'none';
                  }, 750);
                }
                var vid = document.getElementById('preloader-video');
                var safeTimer = setTimeout(fadeOutLoader, 8000);
                if (vid) {
                  vid.addEventListener('ended', function() {
                    clearTimeout(safeTimer);
                    fadeOutLoader();
                  });
                  vid.play().catch(function() {
                    // Autoplay blocked — dismiss immediately
                    clearTimeout(safeTimer);
                    fadeOutLoader();
                  });
                } else {
                  clearTimeout(safeTimer);
                  fadeOutLoader();
                }
              })();
            `,
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1306050034750332&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

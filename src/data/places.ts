import bangalore1 from "@/assets/bangalore 1.JPG";
import bangalore2 from "@/assets/bangalore 2.JPG";
import bangalore3 from "@/assets/bangalore 3.JPG";
import bangalore4 from "@/assets/bangalore 4.JPG";
import bangalore5 from "@/assets/bangalore 5.JPG";
import bangalore6 from "@/assets/bangalore 6.JPG";
import bangalore7 from "@/assets/bangalore 7.JPG";
import bangalore8 from "@/assets/bangalore 8.JPG";
import bangalore9 from "@/assets/bangalore 9.JPG";
import bangalore10 from "@/assets/bangalore 10.JPG";
import bangalore11 from "@/assets/bangalore 11.jpg";
import bangalore12 from "@/assets/bangalore 12.JPG";
import bangalore13 from "@/assets/bangalore 13.jpg";
import bangalore14 from "@/assets/bangalore 14.JPG";
import bangalore15 from "@/assets/bangalore 15.JPG";
import bangalore16 from "@/assets/bangalore 16.JPG";
import bangalore17 from "@/assets/bangalore 17.JPG";
import bangalore18 from "@/assets/bangalore 18.JPG";
import bangalore19 from "@/assets/bangalore 19.JPG";
import bangalore20 from "@/assets/bangalore 20.JPG";
import bangalore21 from "@/assets/bangalore 21.JPG";
import bangalore22 from "@/assets/bangalore 22.JPG";
import bangalore23 from "@/assets/bangalore 23.jpg";
import bangalore24 from "@/assets/bangalore 24.jpg";
import bangalore25 from "@/assets/bangalore 25.jpg";
import bangalore26 from "@/assets/bangalore 26.jpg";
import bangalore27 from "@/assets/bangalore 27.jpg";
import bangalore28 from "@/assets/bangalore 28.jpg";
import bangalore29 from "@/assets/bangalore 29.jpg";
import backgroundBng from "@/assets/background-bng.jpeg";
import goaSecImage from "@/assets/goa sec image.jpeg";
import bngSecImage from "@/assets/bng sec image.jpeg";
import goa1 from "@/assets/Goa/goa 1.JPG";
import goa2 from "@/assets/Goa/goa 2.JPG";
import goa3 from "@/assets/Goa/goa 3.JPG";
import goa4 from "@/assets/Goa/goa 4.JPG";
import goa5 from "@/assets/Goa/goa 5.JPG";
import goa6 from "@/assets/Goa/goa 6.JPG";
import goa7 from "@/assets/Goa/goa 7.JPG";
import goa8 from "@/assets/Goa/goa 8.JPG";
import goa9 from "@/assets/Goa/goa 9.jpg";
import goa10 from "@/assets/Goa/goa 10.JPG";
import goa11 from "@/assets/Goa/goa 11.JPG";
import goa12 from "@/assets/Goa/goa 12.jpg";
import goa13 from "@/assets/Goa/goa 13.jpg";
import goa14 from "@/assets/Goa/goa 14.jpg";
import goa15 from "@/assets/Goa/goa 15.JPG";
import goaBackground from "@/assets/Goa/page background.jpg";

export interface PhotoSlide {
  image: string;
  audio?: string;
  songTitle?: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  mapQuery: string;
  photos: string[];
  slides: PhotoSlide[];
  backgroundImage?: string;
  sectionImage?: string;
  leftNote?: string;
  rightNote?: string;
}

// 🎯 EDIT THIS ARRAY to add your places and photos!
export const places: Place[] = [
  {
    id: "palolem",
    name: "Palolem, Goa",
    description:
      "From tired walks to soaking in the saltwater to watching the stars with you, I saw heaven those days.",
    mapQuery: "Palolem Beach, Goa, India",
    photos: [goa1, goa2, goa3, goa4, goa5, goa6, goa7, goa8, goa9, goa10, goa11, goa12, goa13, goa14, goa15],
    slides: [
      { image: goa1, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa2, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa3, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa4, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa5, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa6, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa7, audio: "/audio /Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa8, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa9, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa10, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa11, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa12, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa13, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa14, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
      { image: goa15, audio: "/audio/Adhento Gaani Vunnapaatuga(Jersey) - Anirudh Ravichander.mp3" },
    ],
    backgroundImage: goaBackground,
    sectionImage: goaSecImage,
    leftNote: "I dont think words or any human language (except the one we share - telugu) could ever describe how much those moments you meant to me, how much you meant to me.But i am gonna try anyway. The way you looked at the ocean that evening, Your wet and beautiful hair, the peaceful smile on your face.I swear to god that smile is h=therapy bro- I captured all those moments in my heart (mental pictures). From carrying those bags for which i loved, begging you to go out with me, feeding you,to finding the perfect spot, every second with you in Goa felt like a dream I never wanted to wake up from.",
    rightNote: "Thank you for taking me to paradise, for showing me what peace truly feels like, for singing with me under the stars. Goa will forever be 'our place' - the beach where I didnt just carry you, but found pieces of ourselves in each other's company. I love how free and happy you made me feel there. we will definitely visit again and many more places to write our own stories . I hope really hope and will try my level best to give you what you gave me, i think i took a lot from you but dont worry i will give you back even more❤️😊. A very Happy birthday once again ma, you mean so much to me so much ante so so so muuccchhh♾️♾️",
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    description:
      "Will always be my second home because of you and is not the same without you here.",
    mapQuery: "Bengaluru, Karnataka, India",
    photos: [bangalore1, bangalore2, bangalore3, bangalore4, bangalore5, bangalore6, bangalore7, bangalore8, bangalore9, bangalore10, bangalore11, bangalore12, bangalore13, bangalore14, bangalore15, bangalore16, bangalore17, bangalore18, bangalore19, bangalore20, bangalore21, bangalore22, bangalore23, bangalore24, bangalore25, bangalore26, bangalore27, bangalore28, bangalore29],
    slides: [
      { image: bangalore1, audio: "/audio/apocalypse.mp3" },
      { image: bangalore2, audio: "/audio/xs.mp3" },
      { image: bangalore3, audio: "/audio/apocalypse.mp3" },
      { image: bangalore4, audio: "/audio/xs.mp3" },
      { image: bangalore5, audio: "/audio/apocalypse.mp3" },
      { image: bangalore6, audio: "/audio/xs.mp3" },
      { image: bangalore7, audio: "/audio/apocalypse.mp3" },
      { image: bangalore8, audio: "/audio/xs.mp3" },
      { image: bangalore9, audio: "/audio/apocalypse.mp3" },
      { image: bangalore10, audio: "/audio/xs.mp3" },
      { image: bangalore11, audio: "/audio/apocalypse.mp3" },
      { image: bangalore12, audio: "/audio/xs.mp3" },
      { image: bangalore13, audio: "/audio/apocalypse.mp3" },
      { image: bangalore14, audio: "/audio/xs.mp3" },
      { image: bangalore15, audio: "/audio/apocalypse.mp3" },
      { image: bangalore16, audio: "/audio/xs.mp3" },
      { image: bangalore17, audio: "/audio/apocalypse.mp3" },
      { image: bangalore18, audio: "/audio/xs.mp3" },
      { image: bangalore19, audio: "/audio/apocalypse.mp3" },
      { image: bangalore20, audio: "/audio/xs.mp3" },
      { image: bangalore21, audio: "/audio/apocalypse.mp3" },
      { image: bangalore22, audio: "/audio/xs.mp3" },
      { image: bangalore23, audio: "/audio/apocalypse.mp3" },
      { image: bangalore24, audio: "/audio/xs.mp3" },
      { image: bangalore25, audio: "/audio/apocalypse.mp3" },
      { image: bangalore26, audio: "/audio/xs.mp3" },
      { image: bangalore27, audio: "/audio/apocalypse.mp3" },
      { image: bangalore28, audio: "/audio/xs.mp3" },
      { image: bangalore29, audio: "/audio/apocalypse.mp3" },
    ],
    backgroundImage: backgroundBng,
    sectionImage: bngSecImage,
    leftNote: "Never thought i wouldve liked bangalore that much but now i do because of you, your presence made it much homely and i will always be thankful for that. Hell i even thank Christ and daksh for that. I will always keep the memories that we made, the photos that we took, the mental pictures that i took close to my heart.I think i knew the moment i talked that we gonna have something special. Oh god i have so many things to thank you for, strating with how you make me a better person, You didnt even have to do anything for that you know, you were just being yourself. and remember that your existence made me a better person in so many ways you have no idea. I learned what it means to care for someone, i learned how nothing matters if that person asks you for soemthing, you just do it. period.",
    rightNote: "you made me do things that i never thought i would do including this website. to be fair, I was not able to digest the fact that i couldnt do anything for your birthday which very special to me. so in a way its selfish.Remember rohini no matter what you do, no matter what you are going through i will always be there for you. I want to. I really do. Wherever you feel alone remember this 70 somewhat kgs body and heart is always with you. I am so so grateful that you are born rohini like seriously means a lot to me and somehow out of billions of possibilities we still met😮 and i think thats for a reason. ive always felt that i will not find anyone in my life ever like this but you appeared out of nowhere. I will always keep you close to my heart ❤️ through the songs you made me listen and the ocean you took me to. I have so other things to write about but i will save them for later otherwise as you said you may get bored of me. lol. 😭😭",
  },
];

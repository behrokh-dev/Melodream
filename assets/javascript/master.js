
//---------slider part for mobile and desktop----------//
function initSliders() {
  document.querySelectorAll(".track-slider").forEach((track) => {
    const section = track.closest("section");
    const nextBtn = section.querySelector(".slider-next");
    const prevBtn = section.querySelector(".slider-prev");

    if (nextBtn) {
      nextBtn.onclick = () => track.scrollBy({ left: 300, behavior: "smooth" });
    }
    if (prevBtn) {
      prevBtn.onclick = () => track.scrollBy({ left: -300, behavior: "smooth" });
    }

    let isDown = false, startX, scrollLeft;

    track.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX);
    });

    track.addEventListener("mouseup", () => (isDown = false));
    track.addEventListener("mouseleave", () => (isDown = false));
  });
}

//---------mainpart- playlist-------------//

const audio = new Audio();
audio.volume = 0.65;

const playerSong = document.querySelector("#playerSong");
const playerArtist = document.querySelector("#playerArtist");

const playBtn = document.querySelector("#playBtn");
const playIcon = document.querySelector("#playIcon");

const progressBar = document.querySelector("#progressBar");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

const shuffleBtn = document.querySelector("#shuffleBtn");
const repeatBtn = document.querySelector("#repeatBtn");

const volumeBar = document.querySelector("#volumeBar");
let lastvolume = 0.65;

const app = document.querySelector("#app");
const homeHTML = app.innerHTML;

let currentArtist = null;
let currentIndex = 0;
 
let isShuffle = false;
let repeatMode = 0; 

const artists = {
  "sirvan-khosravi": {
    name: "Sirvan Khosravi",
    image: "assets/img/sirvan.webp",
    songs: [
      {
        name: "Khaterat To",
        url: "https://dl.musicdel.ir/Music/98/05/Music/Sirvan%20Khosravi%20-%20Khaterate%20To.mp3",
      },
      {
        name: "Man Moghaseram",
        url: "https://dl.musicdel.ir/tag/music/1400/05/28/Sirvan%20Khosravi%20-%20Man%20Moghaseram%20(128).mp3",
      },
      {
        name: "Dorost Nemisham",
        url: "https://dl.musicdel.ir/Music/1400/04/sirvan_khosravi_dorost_nemisham%20128.mp3",
      },
      {
        name: "Zire Aab",
        url: "https://dl.musicdel.ir/Music/1400/04/sirvan_khosravi_zire_ab%20128.mp3",
      },
      {
        name: "Kheili Rooza Gozasht",
        url: "https://dl.musicdel.ir/Music/1400/04/sirvan_khosravi_kheili_rooza%20gozasht%20128.mp3",
      },
      {
        name: "Bazam Betab",
        url: "https://dl.musicdel.ir/Music/1400/04/sirvan_khosravi_bazam_betab.mp3",
      },
      {
        name: "Man Asheghet Shodam",
        url: "https://dl.musicdel.ir/Music/1403/02/sirvan_khosravi_man_asheghet_shodam.mp3",
      },
      {
        name: "Hese Nab",
        url: "https://dl.musicdel.ir/Music/98/10/Music/Sirvan%20Khosravi%20%E2%80%93%20In%20Hess%20Naabe.mp3",
      },
      {
        name: "Oun Roozaro Mikham",
        url: "https://dl.musicdel.ir/tag/music/1402/09/21/Sirvan%20Khosravi%20-%20On%20Rooza%20Ro%20Mikham%20(320).mp3",
      },
      {
        name: "SooZhehat Tekrarie",
        url: "https://dl.musicdel.ir/Music/1400/03/sirvan_khosravi_soojehat_tekrarie.mp3",
      },
      {
        name: "Einam Migzareh",
        url: "https://dl.musicdel.ir/Music/1400/04/sirvan_khosravi_inam_migzare.mp3",
      },
      {
        name: "Ghabe Aks Khali",
        url: "https://dl.musicdel.ir/Music/1400/04/sirvan_khosravi_ghabe_akse%20khali.mp3",
      },
      {
        name: "Barron Paeizi",
        url: "https://dl.musicdel.ir/tag/music/1402/09/05/Sirvan%20Khosravi%20-%20Baroone%20Paeizi%20(320).mp3",
      },
      {
        name: "Jaye Man Nisti",
        url: "https://dl.musicdel.ir/Music/1400/04/kaveh_yaghmaei%20ft%20sirvan%20khosravi_jaye_man%20nisti.mp3",
      },
    ],
  },

  "younes-bayat": {
    name: "Younes Bayat",
    image: "assets/img/younesbayat.jpg",
    songs: [
      {
        name: "Yadet Raft",
        url: "https://dl.musicdel.ir/Music/1405/05/Younes%20Bayat-Yadet%20Raft-musicdel.ir-128.mp3",
      },
      {
        name: "Boodanet Lazeme",
        url: "https://dl.musicdel.ir/Music/1405/04/Younes%20Bayat-Boodanet%20Lazeme%20-musicdel.ir%20128.mp3",
      },
      {
        name: "Ba Inke",
        url: "https://dl.musicdel.ir/Music/1404/07/Younes%20Bayat-Ghesmatemoun%20Ine%20-musicdel.ir%20128.mp3",
      },
      {
        name: "Raze Penhoon",
        url: "https://dl.musicdel.ir/Music/1404/07/Younes%20Bayat-Raze%20Penhoon%20-musicdel.ir%20128.mp3",
      },
      {
        name: "Bebakhsh",
        url: "https://dl.musicdel.ir/tag/music/1403/05/27/Younes%20Bayat%20-%20Bebakhsh%20(128).mp3",
      },
      {
        name: "Jat Khalie",
        url: "https://dl.musicdel.ir/Music/1402/03/younes_bayat_jat_khalie.mp3",
      },
    ],
  },

  "shadmehr-aghili": {
    name: "Shadmehr Aghili",
    image: "assets/img/shid.jpg",
    songs: [
      {
        name: "Tamasha",
        url: "https://dl.musicgitar.ir/Music/Shadmehr%20Aghili/320/Shadmehr%20Aghili%20-%20Tamasha%20%5B320%5D.mp3?_=2",
      },
      {
        name: "Daste Man Nist",
        url: "https://dl.musicgitar.ir/Music/Shadmehr%20Aghili/320/Shadmehr%20Aghili%20-%20Daste%20Man%20Nist%20%5B320%5D.mp3?_=4",
      },
      {
        name: "Bi Ehsas",
        url: "https://dl.musicgitar.ir/Music/Shadmehr%20Aghili/320/Shadmehr%20Aghili%20-%20Bi%20Ehsas%20%5B320%5D.mp3?_=5",
      },
      {
        name: "Door Shodi",
        url: "https://dl.musicgitar.ir/Music/Shadmehr%20Aghili/320/Shadmehr%20Aghili%20-%20Door%20Shodi%20%5B320%5D.mp3?_=6",
      },
      {
        name: "Khabe Khosh",
        url: "https://dl.musicgitar.ir/Music/Shadmehr%20Aghili/320/Shadmehr%20Aghili%20-%20Khaabe%20Khosh%20%5B320%5D.mp3?_=7",
      },
      {
        name: "Khooneh",
        url: "https://dl.musicdel.ir/Music/1403/12/Shadmehr-Khooneh%20-musicdel.ir.mp3",
      },
      {
        name: "Hezaro Yek Shab",
        url: "https://dl.musicdel.ir/Music/1403/05//Shadmehr%20Aghili-Hezaro%20Yek%20Shab%20-musicdel.ir.mp3",
      },
      {
        name: "Pare Parvaz",
        url: "https://dl.musicdel.ir/Music/1403/12/Shadmehr-Pare%20Parvaz%20-musicdel.ir.mp3",
      },
      {
        name: "Gol Yas",
        url: "https://dl.musicdel.ir/Music/1403/05//Shadmehr%20Aghili-Gole%20Yas%20-musicdel.ir.mp3",
      },
      {
        name: "Ashegham Bemoon Hamisheh",
        url: "https://dl.musicdel.ir/Music/99/04/Music/Shadmehr%20Aghili%20-%20Hamishegi.mp3",
      }
    ],
  },

  "ehsan-khajeamiri": {
    name: "Ehsan Khajehamiri",
    image: "assets/img/ehsankhajeamiri.jpg",
    songs: [
      {
        name: "Tamashaei",
        url: "https://dl.musicdel.ir/tag/music/1403/08/27/Ehsan%20Khajeh%20Amiri%20-%20Tamashaei%20(128).mp3",
      },
      {
        name: "Divoonegi",
        url: "https://dl.musicdel.ir/Music/1404/05/Ehsan%20Khajeh%20Amiri-Divoonegi%20-musicdel.ir%20128.mp3",
      },
      {
        name: "Paeiz",
        url: "https://dl.musicdel.ir/Music/1401/01/ehsan_khajeh_amiri_paeiz%20128.mp3",
      },
      {
        name: "Taghdir",
        url: "https://dl.musicdel.ir/Music/1401/01/ehsan_khajeh_amiri_taghdir%20128.mp3",
      },
      {
        name: "Eshgh Dovom",
        url: "https://dl.musicdel.ir/Music/1400/05/ehsan_khajeh%20amiri_eshghe_dovom%20128.mp3",
      },
      {
        name: "Bade To",
        url: "https://dl.musicdel.ir/Music/1401/03/ehsan_khajeh_amiri_baade_to.mp3",
      },
      {
        name: "Kojaei",
        url: "https://dl.musicdel.ir/Music/1400/10/ehsan_khajeh%20amiri_kojaei.mp3",
      },
      {
        name: "Gharibeh",
        url: "https://dl.musicdel.ir/Music/1400/05/ehsan_khajeh%20amiri_gharibe.mp3",
      },
      {
        name: "Bitafavot",
        url: "https://dl.musicdel.ir/Music/1401/01/ehsan_khajeh_amiri_bi_tafavot.mp3",
      },
      {
        name: "Be dadam Beres",
        url: "https://dl.musicdel.ir/Music/1400/09/ehsan_khajeh%20amiri_be_dadam%20beres.mp3",
      },
      {
        name: "Khoshbakhti",
        url: "https://dl.musicdel.ir/Music/1401/03/ehsan_khajeh_amiri_khoshbakhti.mp3",
      },
      {
        name: "Darya",
        url: "https://dl.musicdel.ir/Music/1401/03/ehsan_khajeh_amiri_darya.mp3",
      },
      {
        name: "Noosh Daroo",
        url: "https://dl.musicdel.ir/Music/1400/09/ehsan_khajeh%20amiri_noosh_daroo.mp3",
      },
      {
        name: "Nabordeh Ranj",
        url: "https://dl.musicdel.ir/Music/98/10/Music/Ehsan%20khajeh%20Amiri%20-%20Naborde%20Ranj.mp3",
      },
    ],
  },

  "alireza-ghorbani": {
    name: "Alireza Ghorbani",
    image: "assets/img/ghorbani22.jpg",
    songs: [
      {
        name: "Eshgh Asan Nadarad",
        url: "https://dl.musicdel.ir/Music/1400/05/alireza_ghorbani_eshgh_asan%20nadarad%20128.mp3",
      },
      {
        name: "Khial Khosh",
        url: "https://dl.musicdel.ir/Music/99/04/Music/Alireza%20Ghorbani%20-%20Khiale%20Khosh%20(128).mp3",
      },
      {
        name: "Tasian",
        url: "https://dl.musicdel.ir/Music/1403/12/Alireza%20Ghorbani-Tasian%20-musicdel.ir%20128.mp3",
      },
      {
        name: "Maste Eshgh",
        url: "https://dl.musicdel.ir/Music/1403/01/alireza_ghorbani_maste_eshgh%20128.mp3",
      },
      {
        name: "Bahaneh Man",
        url: "https://dl.musicdel.ir/Music/99/04/Music/Alireza%20Ghorbani%20-%20Khiale%20Khosh.mp3",
      },
      {
        name: "Ham Gonah",
        url: "https://dl.musicdel.ir/Music/98/10/Music/Alireza%20Ghorbani%20%E2%80%93%20Ham%20Gonah%20(128).mp3",
      },
      {
        name: "Man Ashegh Chashmat Shodam",
        url: "https://dl.musicdel.ir/Music/1400/04/alireza_ghorbani%20_madare_sefr%20daraje%20128.mp3",
      },
      {
        name: "Ta Asheghi",
        url: "https://dl.musicdel.ir/Music/1404/01/alireza%20ghorbani-Ta%20Asheghi%20-musicdel.ir.mp3",
      },
      {
        name: "Negah",
        url: "https://dl.musicdel.ir/Music/1403/12/alireza%20ghorbani-Negah%20-musicdel.ir.mp3",
      },
      {
        name: "Mahe Man",
        url: "https://dl.musicdel.ir/tag/music/1404/07/21/Alireza%20Ghorbani%20-%20Mahe%20Man%20(320).mp3",
      },
      {
        name: "Ey Del",
        url: "https://dl.musicdel.ir/Music/1404/01/alireza%20ghorbani-ey%20Del%20-musicdel.ir.mp3",
      },
      {
        name: "Mara Bebakhsh",
        url: "https://dl.musicdel.ir/tag/music/1402/06/01/Alireza%20Ghorbani%20-%20Mara%20Bebakhsh%20(320).mp3",
      },
      {
        name: "gisooye Baran",
        url: "https://dl.musicdel.ir/Music/1404/07/Alireza%20Ghorbani-Gisooy%20Baran%20-musicdel.ir.mp3",
      },
      {
        name: "Madar sefr Darageh",
        url: "https://dl.musicdel.ir/Music/1400/04/alireza_ghorbani%20_madare_sefr%20daraje.mp3",
      },
    ],
  },

  "farzad": {
    name:"Farzad Farzin",
    image:"assets/img/farzin7r.jpg",
    songs: [
      {
        name:"Jaye To Khalieh",
        url:"https://dl.musicdel.ir/Music/99/06/Music/Farzad%20Farzin%20-%20Jaye%20to%20Khaliye.mp3"
      },
      {
        name:"Bazigar",
        url:"https://dl.musicdel.ir/Music/1405/05/Farzad%20Farzin-Bazigar-musicdel.ir.mp3"
      },
      {
        name:"Hese Khoob",
        url:"https://dl.musicdel.ir/Music/1405/03/Farzad%20Farzin-Hesse%20Khob%20-musicdel.ir.mp3"
      },
      {
        name:"Ey Jan",
        url:"https://dl.musicdel.ir/Music/1401/03/farzad_farzin_ey_jan.mp3"
      },
      {
        name:"Dele Man",
        url:"https://dl.musicdel.ir/Music/1401/03/farzad_farzin_dele_man.mp3"
      },
      {
        name:"Parvaz",
        url:"https://dl.musicdel.ir/Music/1400/09/farzad_farzin_parvaz.mp3"
      },
      {
        name:"Chatr Shekasteh",
        url:"https://dl.musicdel.ir/Music/1405/03/Farzad%20Farzin-Chatre%20Shekasteh%20-musicdel.ir.mp3"
      },
      {
        name:"Manoto",
        url:"https://dl.musicdel.ir/Music/1401/03/farzad_farzin_manoto.mp3"
      },
      {
        name:"Shabgard",
        url:"https://dl.musicdel.ir/tag/music/1402/02/11/Farzad%20Farzin%20-%20Shabgard%20(320).mp3"
      },
      {
        name:"Baghalam Kon",
        url:"https://dl.musicdel.ir/Music/1401/03/farzad_farzin_baghalam_kon%20128.mp3"
      },
      {
        name:"Mah Asal",
        url:"https://dl.musicdel.ir/Music/1401/01/farzad_farzin_mahe_asal.mp3"
      },
      {
        name:"Bavar Kon",
        url:"https://dl.musicdel.ir/Music/1400/08/farzad_farzin_bavar_kon.mp3"
      },
      {
        name:"Dooneh Dooneh",
        url:"https://dl.musicdel.ir/Music/1400/08/farzad_farzin_done_done.mp3"
      },
      {
        name:"Areh Areh",
        url:"https://dl.musicdel.ir/tag/music/1402/03/08/Farzad%20Farzin%20-%20Are%20Are%20(320).mp3"
      }
    ]
  },

  "asef-aria": {
    name: "Asef Aria",
    image: "assets/img/asf.jpg",
    songs: [
      {
        name: "Mouye Lakht",
        url: "https://dl.musicdel.ir/Music/1400/04/asef_aria_mooye_lakht%20128.mp3",
      },
      {
        name: "Che Ajab",
        url: "https://dl.musicdel.ir/Music/1400/10/asef_aria_che_ajab%20128.mp3",
      },
      {
        name: "To Yedooneh",
        url: "https://dl.musicdel.ir/Music/1400/08/asef_aria_to_ye%20doone%20128.mp3",
      },
      {
        name: "Be Ma Mireseh",
        url: "https://dl.musicdel.ir/Music/1404/02/Asef%20Aria-Be%20Ma%20Mirese%20-musicdel.ir%20128.mp3",
      },
      {
        name: "Cheshmato",
        url: "https://dl.musicdel.ir/Music/1401/01/asef_aria_zaman_vaisteh%20128.mp3",
      },
      {
        name: "Bargard",
        url: "https://dl.musicdel.ir/Music/1401/01/asef_aria_bargard.mp3",
      },
      {
        name: "Adam Hesabi",
        url: "https://dl.musicdel.ir/tag/music/1402/02/31/Asef%20Aria%20-%20Eshghe%20To%20Base%20Mane%20(320).mp3",
      },
      {
        name: "Moghaser Manam",
        url: "https://dl.musicdel.ir/tag/music/1403/05/14/Asef%20Aria%20-%20Moghaser%20Manam%20(320).mp3",
      },
      {
        name: "Payatam Man",
        url: "https://dl.musicdel.ir/Music/1400/04/asef_aria_payatam_man.mp3",
      },
      {
        name: "Hamsafar",
        url: "https://dl.musicdel.ir/Music/1400/10/asef_aria_hamsafar.mp3",
      },
      {
        name: "His",
        url: "https://dl.musicdel.ir/tag/music/1400/07/01/Asef%20Aria%20-%20Hiss%20(320).mp3",
      },
      {
        name: "Tabestoon",
        url: "https://dl.musicdel.ir/tag/music/1403/04/07/Asef%20Aria%20-%20Tabestoon%20(320).mp3",
      },
      {
        name: "Gardan Nemigiram",
        url: "https://dl.musicdel.ir/tag/music/1402/10/04/Asef%20Aria%20-%20Nabodi%20Dar%20Hadam%20(320).mp3",
      },
      {
        name: "Negaranetam",
        url: "https://dl.musicdel.ir/tag/music/1400/02/31/Asef%20Aria%20-%20Negaranetam%20%20(320).mp3",
      },
    ],
  },

  "homayoun-shajarian": {
    name: "Homayoun Shajarian",
    image: "assets/img/homayoun.jpg",
    songs: [
      {
        name: "Ba Man Sanama",
        url: "https://dl.musicdel.ir/Music/1400/05/homayoun_shajaryan_ba_man%20sanama%20128.mp3",
      },
      {
        name: "Koli",
        url: "https://dl.musicdel.ir/Music/1400/05/homayoun_shajaryan_koli%20128.mp3",
      },
      {
        name: "jeyran",
        url: "https://dl.musicdel.ir/tag/music/1400/11/24/Homayoun%20Shajaryan%20-%20Jeyran%20(128).mp3",
      },
      {
        name: "Chera Rafti",
        url: "https://dl.musicdel.ir/Music/1400/05/homayoun_shajaryan_chera_rafti%20128.mp3",
      },
      {
        name: "Rage Khab",
        url: "https://dl.musicdel.ir/tag/music/1400/06/07/Homayoun%20Shajaryan%20-%20Ahay%20Khabardar%20(128).mp3",
      },
      {
        name: "Man Koja Baran Koja",
        url: "https://dl.musicdel.ir/tag/music/1403/03/15/Homayoun%20Shajaryan%20-%20Man%20Koja%20Baran%20Koja%20(128).mp3",
      },
      {
        name: "Abr Mibarad",
        url: "https://dl.musicdel.ir/Music/99/06/Music/Homayoun%20Shajarian%20%E2%80%93%20Abr%20Mibarad.mp3",
      },
      {
        name: "Bal Royayei Eshgh",
        url: "https://dl.musicdel.ir/tag/music/1400/05/01/Homayoun%20Shajaryan%20-%20Bale%20Royaeie%20Eshgh%20(320).mp3",
      },
      {
        name: "Hameh Hichim",
        url: "https://dl.musicdel.ir/Music/1402/10/homayoun_shajaryan_hame_hicham.mp3",
      },
      {
        name: "Bar Man Gozashti",
        url: "https://dl.musicdel.ir/tag/music/1402/07/09/Homayoun%20Shajaryan%20-%20Bar%20Man%20Gozashti%20(320).mp3",
      },
      {
        name: "Mahve Tamasha",
        url: "https://dl.musicdel.ir/Music/99/10/Music/Homayoun%20Shajarian%20&%20Ali%20Ghamsari%20-%20Mahve%20Tamasha%20(320).mp3",
      },
      {
        name: "Man Be Tekrar Be Khod Migouyam",
        url: "https://dl.musicdel.ir/Music/1401/01/homayoun_shajaryan_dele_man_migeryad.mp3",
      },
      {
        name: "Shirinsazem",
        url: "https://dl.musicdel.ir/Music/1401/03/homayoun_shajaryan_shirin_sozeh.mp3",
      },
      {
        name: "Bidar Sho",
        url: "https://dl.musicdel.ir/Music/1401/03/homayoun_shajaryan_bidar_sho.mp3",
      },
    ],
  },

  "babak-jahanbakhsh": {
    name: "Babak Jahanbakhsh",
    image: "assets/img/jahanbakhsh.jpg",
    songs: [
      {
        name: "Paiez",
        url: "https://dl.musicdel.ir/Music/1400/04/babak_jahanbakhsh_paeiz%20128.mp3",
      },
      {
        name: "jazebeh",
        url: "https://dl.musicdel.ir/Music/1401/03/babak_jahanbakhsh_jazebeh%20128.mp3",
      },
      {
        name: "Sheidaei",
        url: "https://dl.musicdel.ir/Music/99/10/Music/Babak%20Jahanbakhsh%20Sheydaei%20(128).mp3",
      },
      {
        name: "Manzoomeh Ehsas",
        url: "https://dl.musicdel.ir/Music/1400/04/babak_jahanbakhsh_manzomeye_ehsas%20128.mp3",
      },
      {
        name: "Hale Cheshamt",
        url: "https://dl.musicdel.ir/Music/1401/03/babak_jahanbakhsh_ey_vaay.mp3",
      },
      {
        name: "Mano Baroon",
        url: "https://dl.musicdel.ir/Music/1400/05/reza_sadeghi%20ft%20babak%20jahanbakhsh_mano_baroon%20128.mp3",
      },
      {
        name: "Hamin Yebar",
        url: "https://dl.musicdel.ir/Music/1400/05/babak_jahanbakhsh_hamin_ye%20bar%20128.mp3",
      },
      {
        name: "Havay Man",
        url: "https://dl.musicdel.ir/Music/1401/01/babak_jahanbakhsh_havvaye_man.mp3",
      },
      {
        name: "Be Kasi Che",
        url: "https://dl.musicdel.ir/Music/1400/03/babak_jahanbakhsh_be_kasi%20che.mp3",
      },
      {
        name: "Mashhoor",
        url: "https://dl.musicdel.ir/tag/music/1403/08/16/Babak%20Jahanbakhsh%20-%20Mashhoor%20(320).mp3",
      },
      {
        name: "Mano Negah Kon",
        url: "https://dl.musicdel.ir/Music/1400/04/babak_jahanbakhsh_mano_negah%20kon.mp3",
      },
      {
        name: "Tasmim",
        url: "https://dl.musicdel.ir/Music/1401/03/babak_jahanbakhsh_tasmim.mp3",
      },
      {
        name: "Sazesh",
        url: "https://dl.musicdel.ir/Music/1400/09/babak_jahanbakhsh_sazesh.mp3",
      },
      {
        name: "Deltangi",
        url: "https://dl.musicdel.ir/Music/1401/03/babak_jahanbakhsh_deltangi.mp3",
      },
    ],
  },

  "hamim": {
    name: "Hamim",
    image: "assets/img/Hamim-Remix.jpg",
    songs: [
      {
        name: "Ghalbe Mani",
        url: "https://dl.musicdel.ir/tag/music/1401/12/24/Haamim%20-%20Ghalbe%20Mani%20(128).mp3",
      },
      {
        name: "Yehoo Hame Chi Sard Shod",
        url: "https://dl.musicdel.ir/Music/1400/05/haamim_avalash%20128.mp3",
      },
      {
        name: "Adamaye Shahr",
        url: "https://dl.musicdel.ir/Music/1401/01/haamim_adamay_shahr%20128.mp3",
      },
      {
        name: "Ki Mishe Man",
        url: "https://dl.musicdel.ir/tag/music/1401/04/22/Haamim%20-%20Ki%20Mishe%20Man%20(128).mp3",
      },
      {
        name: "Eshgh Ghadimi",
        url: "https://dl.musicdel.ir/tag/music/1402/02/01/Haamim%20-%20Eshghe%20Ghadimi%20(128).mp3",
      },
      {
        name: "Roze Sefid",
        url: "https://dl.musicdel.ir/Music/1401/01/haamim_rose_sefid_guitar%20128.mp3",
      },
      {
        name: "Bi Rang",
        url: "https://dl.musicdel.ir/Music/1405/03/Haamim-Bi%20Rang%20-musicdel.ir.mp3",
      },
      {
        name: "Man",
        url: "https://dl.musicdel.ir/tag/music/1403/11/26/Haamim%20-%20Man%20(320).mp3",
      },
      {
        name: "Razi Shodi",
        url: "https://dl.musicdel.ir/tag/music/1404/01/27/Hamim%20-%20Razi%20Shodi%20AI%20(320).mp3",
      },
      {
        name: "Nime Gomshodeh",
        url: "https://dl.musicdel.ir/tag/music/1402/01/03/Haamim%20-%20Nimey%20Gomshode%20(320).mp3",
      },
      {
        name: "Boro Ba Hame Khobihat",
        url: "https://dl.musicdel.ir/tag/music/1402/10/13/Haamim%20-%20In%20Hame%20Adam%20(128).mp3",
      },
      {
        name: "Yekio Daram",
        url: "https://dl.musicdel.ir/tag/music/1400/07/15/Haamim%20-%20Yekio%20Daram%20(320).mp3",
      },
      {
        name: "Az Ghasd",
        url: "https://dl.musicdel.ir/Music/1400/09/haamim_az_ghasd.mp3",
      },
      {
        name: "Baseh",
        url: "https://dl.musicdel.ir/Music/1401/01/haamim_base.mp3",
      },
    ],
  },

  "roozbeh-bemani": {
    name: "Roozbeh Bemani",
    image: "assets/img/roozbehbemani.jpg",
    songs: [
      {
        name: "Asheghi",
        url: "https://dl.musicdel.ir/Music/1400/05/roozbeh_bemani_asheghi%20128.mp3",
      },
      {
        name: "Man Hafezam",
        url: "https://dl.musicdel.ir/Music/1401/01/roozbeh_bemani_man_hafezam%20128.mp3",
      },
      {
        name: "Shelik",
        url: "https://dl.musicdel.ir/tag/music/1403/12/05/Roozbeh%20bemani%20-%20Shelik%20(128).mp3",
      },
      {
        name: "Cheshmat",
        url: "https://dl.musicdel.ir/tag/music/1402/02/24/Roozbeh%20Bemani%20-%20Cheshmat%20(128).mp3",
      },
      {
        name: "Bi To Boodan",
        url: "https://dl.musicdel.ir/Music/99/04/Music/Roozbeh%20Bemani%20%E2%80%93Bi%20To%20Boodan%20(128).mp3",
      },
      {
        name: "Hokm",
        url: "https://dl.musicdel.ir/tag/music/1403/09/09/Roozbeh%20Bemani%20-%20Hokm%20(128).mp3",
      },
      {
        name: "Tanhaei",
        url: "https://dl.musicdel.ir/Music/1403/11/Roozbeh%20Bemani-Tanhaee%20-musicdel.ir%20128.mp3",
      },
      {
        name: "Beman",
        url: "https://dl.musicdel.ir/Music/99/04/Music/Roozbeh%20Bemani%20-%20Beman%20(128).mp3",
      },
      {
        name: "Mahale",
        url: "https://dl.musicdel.ir/Music/1400/05/roozbeh_bemani_alaaj%20128.mp3",
      },
      {
        name: "Shomal",
        url: "https://dl.musicdel.ir/tag/music/1401/02/10/Roozbeh%20Bemani%20-%20Shomal%20(128).mp3",
      },
      {
        name: "Be Man Nagoo Khodahafez",
        url: "https://dl.musicdel.ir/tag/music/1403/12/03/Roozbeh%20Bemani%20-%20Be%20Man%20Nagoo%20Khodahafez%20(320).mp3",
      },
      {
        name: "Chaloos",
        url: "https://dl.musicdel.ir/Music/99/09/Music/Roozbeh%20Bemani%20%E2%80%93%20Chaloos%20(320).mp3",
      },
      {
        name: "Khergheh",
        url: "https://dl.musicdel.ir/Music/1401/01/roozbeh_bemani_kherghe.mp3",
      },
      {
        name: "Aval Nadidamet",
        url: "https://dl.musicdel.ir/tag/music/1403/12/10/Roozbeh%20Bemani%20-%20Aval%20Nadidamet%20(320).mp3",
      },
    ],
  },

  "7-band": {
    name: "Seven-7 Band",
    image: "assets/img/7-Band.jpg",
    songs: [
      {
        name: "Kheili Dooset Daram",
        url: "https://dl.musicdel.ir/Music/98/10/Music/7%20Band%20-%20Kheili%20Ziyad%20Doset%20Daram.mp3",
      },
      {
        name: "Eshghe Man",
        url: "https://dl.musicdel.ir/Music/1400/12/7_band_eshghe_man%20128.mp3",
      },
      {
        name: "Delbakhte",
        url: "https://dl.musicdel.ir/tag/music/1404/01/07/seven%20band%20-%20Delbakhte%20(128).mp3",
      },
      {
        name: "tanhatarin",
        url: "https://dl.musicdel.ir/tag/music/1404/01/12/Seven%20Band%20-%20Tanhatariin%20(128).mp3",
      },
      {
        name: "Ey Dad",
        url: "https://dl.musicdel.ir/Music/1400/05/7_band_ey_dad%20128.mp3",
      },
      {
        name: "divooneh",
        url: "https://dl.musicdel.ir/tag/music/1404/01/08/Seven%20Band%20-%20Divoone%20(128).mp3",
      },
      {
        name: "Nafas",
        url: "https://dl.musicdel.ir/Music/1403/12/Seven%20Band-Nafas%20-musicdel.ir%20128.mp3",
      },
      {
        name: "Man Bi To Mimiram",
        url: "https://dl.musicdel.ir/Music/1403/12/Seven%20Band-Man%20Bi%20To%20Mimiram%20-musicdel.ir%20128.mp3",
      },
      {
        name: "Koocheh",
        url: "https://dl.musicdel.ir/tag/music/1404/01/13/Seven%20Band%20-%20Kocheh%20(320).mp3",
      },
      {
        name: "Doroghgoo",
        url: "https://dl.musicdel.ir/tag/music/1404/01/13/Seven%20Band%20-%20Dorogh%20Goo%20(320).mp3",
      },
      {
        name: "Khahesh",
        url: "https://dl.musicdel.ir/tag/music/1404/01/10/Seven%20Band%20-%20Khahesh%20(320).mp3",
      },
      {
        name: "Halleh",
        url: "https://dl.musicdel.ir/Music/1403/12/Seven%20Band-Hale%20-musicdel.ir.mp3",
      },
      {
        name: "Avalin Eshgh",
        url: "https://dl.musicdel.ir/Music/1403/12/Seven%20Band-Avalin%20Eshgh%20-musicdel.ir.mp3",
      },
      {
        name: "Goosheh Be Goosheh",
        url: "https://dl.musicdel.ir/Music/1403/12/Seven%20Band-Gooshe%20Be%20Gooshe%20-musicdel.ir.mp3",
      },
    ],
  },

  "arshias": {
    name: "Arshias",
    image: "assets/img/arshias.jpg",
    songs: [
      {
        name: "Yare Bolandam",
        url: "https://dl.musicdel.ir/Music/1403/12/Arshiyas-Almas%20-musicdel.ir%20128.mp3",
      },
      {
        name: "Ayeneh",
        url: "https://dl.musicdel.ir/tag/music/1402/05/09/Arshiyas%20-%20Ayene%20(128).mp3",
      },
      {
        name: "Kash",
        url: "https://dl.musicdel.ir/tag/music/1402/01/27/Arshiyas%20-%20Kash%20(128).mp3",
      },
      {
        name: "Eshtebah",
        url: "https://dl.musicdel.ir/Music/1400/05/arshiyas_eshtebah%20128.mp3",
      },
      {
        name: "Hame Chizam",
        url: "https://dl.musicdel.ir/Music/1404/01/Arshiyas-Oon%20hame%20Chizam%20Bood%20-musicdel.ir%20128.mp3",
      },
      {
        name: "Baroon Mibareh",
        url: "https://dl.musicdel.ir/tag/music/1402/08/09/Arshiyas%20-%20Baroon%20Mibare%20(128).mp3",
      },
      {
        name: "Toro Be Donya Nemidam",
        url: "https://dl.musicdel.ir/Music/1404/04/Arshiyas-Toro%20Be%20Donya%20Nemidam%20-musicdel.ir%20128.mp3",
      },
      {
        name: "Hamin Bood",
        url: "https://dl.musicdel.ir/tag/music/1404/08/24/Arshiyas%20-%20Hamin%20Bood%20(128).mp3",
      },
      {
        name: "Cheshami",
        url: "https://dl.musicdel.ir/tag/music/1401/04/22/Arshiyas%20-%20Cheshami%20(320).mp3",
      },
      {
        name: "Hava Sarde",
        url: "https://dl.musicdel.ir/tag/music/1402/12/13/Arshiyas%20-%20Hava%20Sarde%20(320).mp3",
      },
      {
        name: "Ghahr",
        url: "https://dl.musicdel.ir/tag/music/1402/11/14/Arshiyas%20-%20Ghahr%20(320).mp3",
      },
      {
        name: "1000 Hezar",
        url: "https://dl.musicdel.ir/tag/music/1402/10/04/Arshiyas%20-%20Hezar%20(320).mp3",
      },
      {
        name: "Mishe Ghalbet Beshe Khoonam",
        url: "https://dl.musicdel.ir/tag/music/1401/11/23/Arshiyas%20-%20Koche%20(320).mp3",
      },
      {
        name: "Divoonam",
        url: "https://dl.musicdel.ir/tag/music/1403/11/02/Arshiyas%20-%20Sare%20To%20Yeki%20(320).mp3",
      },
    ],
  },

  "ashvan": {
    name: "Ashvan",
    image: "assets/img/ashvan.jpg",
    songs: [
      {
        name: "Age Nabashi",
        url: "https://dl.musicdel.ir/Music/1401/03/ashvan_age_nabashi%20128.mp3",
      },
      {
        name: "Mano Daryab",
        url: "https://dl.musicdel.ir/Music/1400/05/ashvan_mano_daryab%20128.mp3",
      },
      {
        name: "Fekre Man Nabash",
        url: "https://dl.musicdel.ir/tag/music/1402/08/20/Ashvan%20-%20Fekre%20Man%20Nabash%20(128).mp3",
      },
      {
        name: "Dobareh To",
        url: "https://dl.musicdel.ir/Music/99/06/Music/Ashvan%20%E2%80%93%20Dobare%20To.mp3",
      },
      {
        name: "Havaset Nist",
        url: "https://dl.musicdel.ir/Music/1401/03/ashvan_havaset_nist%20128.mp3",
      },
      {
        name: "Ghargh Geryeh",
        url: "https://dl.musicdel.ir/Music/98/10/Music/Ashvan%20-%20Gharghe%20Gerye%20(128).mp3",
      },
      {
        name: "Ashegh Misham",
        url: "https://dl.musicdel.ir/Music/99/06/Music/Ashvan%20%E2%80%93%20Daaram%20Aashegh%20Misham%20(128).mp3",
      },
      {
        name: "To Faghat Bash",
        url: "https://dl.musicdel.ir/Music/1400/04/ashvan_sheyda%20128.mp3",
      },
      {
        name: "Tanha Shodam",
        url: "https://dl.musicdel.ir/Music/98/10/Music/Ashvan%20-%20Tanha%20Shodam%20(128).mp3",
      },
      {
        name: "Bade Man",
        url: "https://dl.musicdel.ir/Music/1401/01/ashvan_bade_man.mp3",
      },
      {
        name: "Ghasedak",
        url: "https://dl.musicdel.ir/tag/music/1401/02/24/Ashvan%20-%20Ghasedak%20(320).mp3",
      },
      {
        name: "Man Adam Royaye To Nistam",
        url: "https://dl.musicdel.ir/Music/1401/01/ashvan_man_adame_royaye_to_nistam.mp3",
      },
      {
        name: "Hamdast",
        url: "https://dl.musicdel.ir/tag/music/1404/09/05/Ashvan%20Mahyar%20-%20Hamdast%20(320).mp3",
      },
      {
        name: "Zare Zare",
        url: "https://dl.musicdel.ir/tag/music/1402/04/13/Ashvan%20-%20Zare%20Zare%20(320).mp3",
      },
    ],
  },

  "erfan": {
    name: "Erfan Tahmasebi",
    image: "assets/img/erfan.jpg",
    songs: [
      {
        name: "Galooband",
        url: "https://dl.musicdel.ir/tag/music/1402/12/29/Erfan%20Tahmasbi%20-%20Geloband%20(128).mp3",
      },
      {
        name: "Manoto",
        url: "https://dl.musicdel.ir/tag/music/1402/06/11/Erfan%20Tahmasbi%20-%20To%20(320).mp3",
      },
      {
        name: "Kojaei",
        url: "https://dl.musicdel.ir/tag/music/1400/12/21/Erfan%20Tahmasbi%20-%20Kojaei%20(128).mp3",
      },
      {
        name: "Khial",
        url: "https://dl.musicdel.ir/tag/music/1401/04/13/Erfan%20Tahmasbi%20-%20Khial%20(128).mp3",
      },
      {
        name: "Vay Agar",
        url: "https://dl.musicdel.ir/tag/music/1402/12/08/Erfan%20Tahmasbi%20-%20Vay%20Agar%20(128).mp3",
      },
      {
        name: "Emshab",
        url: "https://dl.musicdel.ir/tag/music/1404/06/22/Erfan%20Tahmasbi%20-%20Emshab%20(128).mp3",
      },
      {
        name: "Che Konam",
        url: "https://dl.musicdel.ir/Music/1402/02/erfan_tahmasbi_che_konam%20128.mp3",
      },
      {
        name: "Hezaro yek Shab",
        url: "https://dl.musicdel.ir/tag/music/1403/12/22/Erfan%20Tahmasbi%20-%20Hezaro%20Yek%20Shab%20(128).mp3",
      },
      {
        name: "Mah Mo",
        url: "https://dl.musicdel.ir/Music/1400/05/erfan_tahmasbi_mahe_mo%20128.mp3",
      },
      {
        name: "Gole Mahtab",
        url: "https://dl.musicdel.ir/Music/1400/05/erfan_tahmasbi_gole_mahtab%20128.mp3",
      },
      {
        name: "To",
        url: "https://dl.musicdel.ir/tag/music/1402/06/11/Erfan%20Tahmasbi%20-%20To%20(320).mp3",
      },
      {
        name: "Delgir",
        url: "https://dl.musicdel.ir/tag/music/1403/05/29/Erfan%20Tahmasbi%20-%20Delgir%20(320).mp3",
      },
      {
        name: "Tardid",
        url: "https://dl.musicdel.ir/Music/1400/05/erfan_tahmasbi_tardid.mp3",
      },
      {
        name: "Shome Tar",
        url: "https://dl.musicdel.ir/Music/1400/05/erfan_tahmasbi_shoome_taar%20128.mp3",
      },
    ],
  },

  "golab": {
    name: "Amirabbas Golab",
    image: "assets/img/golab.jpg",
    songs: [
      {
        name: "Ham Nam",
        url: "https://dl.musicdel.ir/Music/1400/03/amir_abbas%20golab_ham_nam%20128.mp3",
      },
      {
        name: "Bemanad",
        url: "https://dl.musicdel.ir/Music/98/04/Music/Amirabbas%20Golab%20%E2%80%93%20Bemanad.mp3",
      },
      {
        name: "Gahvareh",
        url: "https://dl.musicdel.ir/Music/1400/03/amir_abbas%20golab_gahvare%20128.mp3",
      },
      {
        name: "Lanat",
        url: "https://dl.musicdel.ir/Music/1400/03/amir_abbas%20golab_lanat%20128.mp3",
      },
      {
        name: "Fer Feri ",
        url: "https://dl.musicdel.ir/Music/1400/03/amir_abbas%20golab_banoo_jan%20128.mp3",
      },
      {
        name: "Kojaye Donyayei?",
        url: "https://dl.musicdel.ir/Music/1400/03/amir_abbas%20golab_kojaye_donyaei%20128.mp3",
      },
      {
        name: "Hala Hey Boro",
        url: "https://dl.musicdel.ir/Music/1400/03/amir_abbas%20golab_sadas%20128.mp3",
      },
      {
        name: "Koodakaneh",
        url: "https://dl.musicdel.ir/Music/1400/03/amir_abbas%20golab_kodakaneh%20128.mp3",
      },
      {
        name: "Tekrar",
        url: "https://dl.musicdel.ir/Music/1403/12/amir%20abbas%20golab-Tekrar%20-musicdel.ir.mp3",
      },
      {
        name: "Roozaye Delkhori",
        url: "https://dl.musicdel.ir/Music/1400/03/amir_abbas%20golab_roozhaye_delkhori.mp3",
      },
      {
        name: "Shah Ghalbam",
        url: "https://dl.musicdel.ir/Music/1400/03/amir_abbas%20golab_shahe_ghalbam.mp3",
      },
      {
        name: "Ezdevaj",
        url: "https://dl.musicdel.ir/Music/1400/03/amir_abbas%20golab_ezdevaj.mp3",
      },
      {
        name: "Lalaeei",
        url: "https://dl.musicdel.ir/Music/1403/12/amir%20abbas%20golab-Lalaie%20-musicdel.ir.mp3",
      },
      {
        name: "Chashm siah",
        url: "https://dl.musicdel.ir/Music/1400/03/amir_abbas%20golab_cheshm_siah.mp3",
      },
    ],
  },

  "mammrez": {
    name: "Mamrez",
    image: "assets/img/mmamrez.jpg",
    songs: [
      {
        name: "Damane Zardoo",
        url: "https://dl.musicdel.ir/Music/1404/06/Mammrez-Daman%20Zardoo%20-musicdel.ir.mp3",
      },
      {
        name: "Aroos Daryayei",
        url: "https://dl.musicdel.ir/Music/1404/07/Mammrez-Aroose%20Deryaei%20-musicdel.ir.mp3",
      },
      {
        name: "Bio Khoonat",
        url: "https://dl.musicdel.ir/Music/1404/07/Mammrez-Bio%20Khoonat%20-musicdel.ir.mp3",
      },
      {
        name: "Yadam Miofti",
        url: "https://dl.musicdel.ir/Music/1405/03/Mammrez-Yadam%20Miofti%20-musicdel.ir.mp3",
      },
      {
        name: "Ye Baram Nashod",
        url: "https://dl.musicdel.ir/Music/1405/05/Mammrez-Yek%20Baram%20Nashod-musicdel.ir.mp3",
      },
      {
        name: "Ki Mano Baghal Mikoneh",
        url: "https://dl.musicdel.ir/Music/1403/12/Mamrez-Ki%20Mano%20Baghal%20Kone%20-musicdel.ir.mp3",
      },
    ],
  },

  "novan": {
    name: "Novan",
    image: "assets/img/novan.jpg",
    songs: [
      {
        name: "Ham Nazar",
        url: "https://dl.musicdel.ir/tag/music/1402/12/05/Novan%20-%20Ham%20Nazar%20(128).mp3",
      },
      {
        name: "Lazemami",
        url: "https://dl.musicdel.ir/tag/music/1402/04/24/Novan%20-%20Lazemami%20(320).mp3",
      },
      {
        name: "Azizam",
        url: "https://dl.musicdel.ir/Music/1405/05/Novan-Azizam-musicdel.ir.mp3",
      },
      {
        name: "Berim Darya",
        url: "https://dl.musicdel.ir/Music/1400/03/novan_berim_darya.mp3",
      },
      {
        name: "Joonami",
        url: "https://dl.musicdel.ir/tag/music/1404/02/14/Novan%20-%20Joonami%20(320).mp3",
      },
      {
        name: "Docharetam",
        url: "https://dl.musicdel.ir/tag/music/1402/07/25/Novan%20-%20Docharetam%20(320).mp3",
      },
      {
        name: "Yadeteh",
        url: "https://dl.musicdel.ir/tag/music/1402/10/26/Novan%20-%20Yadete%20(128).mp3",
      },
      {
        name: "hokm Lazem",
        url: "https://dl.musicdel.ir/tag/music/1404/12/12/Novan%20-%20Hokm%20Lazem%20Demo%20(128).mp3",
      },
      {
        name: "Mosaken Ghalbam",
        url: "https://dl.musicdel.ir/tag/music/1404/05/21/Novan%20-%20Mosaken%20(320).mp3",
      },
      {
        name: "Baby",
        url: "https://dl.musicdel.ir/Music/1402/06/novan_baby.mp3",
      },
      {
        name: "Eshgham Salam",
        url: "https://dl.musicdel.ir/Music/1400/05/novan_eshgham_salam.mp3",
      },
      {
        name: "Refigh Payeh",
        url: "https://dl.musicdel.ir/tag/music/1402/04/24/Novan%20-%20Lazemami%20(320).mp3",
      },
      {
        name: "Bi To Har Shab",
        url: "https://dl.musicdel.ir/Music/1403/11/Novan-Bi%20To%20Har%20Shab%20-musicdel.ir.mp3",
      },
      {
        name: "Nabzam",
        url: "https://dl.musicdel.ir/tag/music/1404/05/21/Novan%20-%20Mosaken%20(320).mp3",
      },
    ],
  },

  "ebi": {
    name: "Ebi",
    image: "assets/img/ebi.jpg",
    songs: [
      {
      name:"Pooste Shir",
      url:"https://dl.mokhtalefmusic.com/music/1401/11/29/Ebi%20-%20Pooste%20Shir.mp3"
    },{
      name:"Ay Yar Begoo",
      url:"https://musicviral.musitraf.com/Music/1403-12/Ay%20Yar%20Begoo%20-%20Ebi.mp3?_=51"
    },{
      name:"Badraghe",
      url:"https://musicviral.musitraf.com/Music/1403-12/Badraghe%20-%20Ebi.mp3?_=52"
    },{
      name:"Benevis",
      url:"https://musicviral.musitraf.com/Music/1403-12/Benivis%20-%20Ebi.mp3?_=54"
    },{
      name:"Bagh Boloor",
      url:"https://musicviral.musitraf.com/Music/1403-12/Baghe%20Boloor%20-%20Ebi.mp3?_=53"
    },{
      name:"Gol Vajeh",
      url:"https://musicviral.musitraf.com/Music/1403-12/Gol%20Vajeh%20-%20Ebi.mp3?_=62"
    },{
      name:"Hamdam",
      url:"https://musicviral.musitraf.com/Music/1403-12/Hamdam%20-%20Ebi.mp3?_=64"
    },{
      name:"Khali",
      url:"https://musicviral.musitraf.com/Music/1403-12/Khali%20-%20Ebi.mp3?_=71"
    },{
      name:"Shoma",
      url:"https://musicviral.musitraf.com/Music/1403-12/Shoma%20-%20Ebi.mp3?_=96"
    },{
      name:"Shabzadeh",
      url:"https://musicviral.musitraf.com/Music/1403-12/Shabzadeh%20-%20Ebi.mp3?_=94"
    },{
      name:"Pichak",
      url:"https://musicviral.musitraf.com/Music/1403-12/Pichak%20-%20Ebi.mp3?_=85"
    },{
      name:"Az Kodoom GHesseei",
      url:"https://xx.sahand-music.ir/Archive/E/Ebi/Ebi%20-%20Taje%20Taraneh/04%20Hamsafar.mp3"
    },{
      name:"Noon o Panir",
      url:"https://xx.sahand-music.ir/Archive/E/Ebi/Ebi%20-%20Roozegar/05%20Noon%20o%20Panir.mp3"
    }],
  },

  "siavash-ghomeishi": {
    name: "Siavash Ghomeishi",
    image: "assets/img/siavashghomeishi.jpg",
    songs: [{
      name:"Golaye Pooneh",
      url:"https://dl.shabamusic.com/Music/1405/04/19/Siavash%20Ghomayshi%20-%20Man%20Be%20Yad%20Atr%20Baroon%20Zade%20(128).mp3"
    },{
      name:"Nakhoda",
      url:"https://dl.shabamusic.com/Music/1405/06/01/Siavash%20Ghomayshi%20-%20Nakhoda%20(128).mp3"
    },{
      name:"Ghoroub",
      url:"https://dl.shabamusic.com/Music/1405/03/20/Siavash%20Ghomeyshi%20-%20Ghoroob%20Az%20To%20Cheshmaye%20Man%20(128).mp3"
    },{
      name:"Jazireh",
      url:"https://dl.shabamusic.com/Music/1405/03/16/Siavash%20Ghomayshi%20-%20Jazireh%20New%20Version%20(128).mp3"
    },{
      name:"Bia Bargard",
      url:"https://dl.shabamusic.com/Music/1405/03/16/Siavash%20Ghomayshi%20-%20Bia%20Bargard%20(128).mp3"
    },{
      name:"Lanat",
      url:"https://dl.shabamusic.com/Music/1405/03/09/Siavash%20Ghomayshi%20-%20Laanat%20(128).mp3"
    },{
      name:"Parseh",
      url:"https://dl.shabamusic.com/Music/1405/03/08/Siavash%20Ghomayshi%20-%20Parseh%20(128).mp3"
    },{
      name:"Nafas Bekesh",
      url:"https://dl.shabamusic.com/Music/1405/03/09/Siavash%20Ghomayshi%20-%20Nafas%20Bekesh%20(128).mp3"
    },{
      name:"Parvaneh",
      url:"https://dl.shabamusic.com/Music/1405/03/08/Siavash%20Ghomayshi%20-%20Parvaneh%20(128).mp3"
    },{
      name:"Sarnevesht",
      url:"https://dl.shabamusic.com/Music/1405/03/08/Siavash%20Ghomayshi%20-%20Sarnevesht%20(128).mp3"
    },{
      name:"Baraks",
      url:"https://dl.shabamusic.com/Music/1405/03/08/Siavash%20Ghomayshi%20-%20BarAx%20(128).mp3"
    },{
      name:"Khazoon",
      url:"https://dl.shabamusic.com/Music/1405/03/08/Siavash%20Ghomayshi%20-%20Khazoon%20(128).mp3"
    },{
      name:"Miri",
      url:"https://dl.shabamusic.com/Music/1405/03/08/Miri%20-%20Siavash%20Ghomayshi%20(128).mp3"
    },{
      name:"Ghasedak",
      url:"https://dl.shabamusic.com/Music/1405/03/08/Siavash%20Ghomayshi%20-%20Ghasedak%20(128).mp3"
    }],
  },

  "yeganeh": {
    name: "Mohsen Yeganeh",
    image: "assets/img/yegane.jpg",
    songs: [
      {
        name: "Beyt Akhar",
        url: "https://dl.musicdel.ir/Music/1404/05/Mohsen%20Yeganeh-Beyte%20Akhar%20-musicdel.ir.mp3",
      },
      {
        name: "Bade Man",
        url: "https://dl.musicdel.ir/Music/1401/03/mohsen_yeganeh_nakhastam.mp3",
      },
      {
        name: "Sareto Balla Begir",
        url: "https://dl.musicdel.ir/Music/1404/03/Mohsen%20Yeganeh-Sareto%20Bala%20Begir%20-musicdel.ir.mp3",
      },
      {
        name: "Betars",
        url: "https://dl.musicdel.ir/tag/music/1403/05/31/Mohsen%20Yeganeh%20-%20Betars%20(320).mp3",
      },
      {
        name: "Negah",
        url: "https://dl.musicdel.ir/Music/1401/01/mohsen_yeganeh_negah.mp3",
      },
      {
        name: "Direh",
        url: "https://dl.musicdel.ir/tag/music/1403/09/19/Mohsen%20Yeganeh%20-%20Dire%20(320).mp3",
      },
      {
        name: "Behet Ghol midam",
        url: "https://dl.musicdel.ir/tag/music/1402/02/28/Mohsen%20Yeganeh%20-%20Behet%20Ghol%20Midam%20(320).mp3",
      },
      {
        name: "Moohat",
        url: "https://dl.musicdel.ir/Music/1400/12/mohsen_yeganeh_moohat.mp3",
      },
      {
        name: "kavir",
        url: "https://dl.musicdel.ir/Music/1400/05/mohsen_yeganeh_kavir.mp3",
      },
      {
        name: "Obour",
        url: "https://dl.musicdel.ir/Music/1400/05/mohsen_yeganeh_oboor.mp3",
      },
      {
        name: "Nemishe",
        url: "https://dl.musicdel.ir/Music/1401/03/mohsen_yeganeh_nemishe%20128.mp3",
      },
      {
        name: "Entezar",
        url: "https://dl.musicdel.ir/Music/1401/03/mohsen_yeganeh_entezar.mp3",
      },
      {
        name: "Kash",
        url: "https://dl.musicdel.ir/Music/1401/03/mohsen_yeganeh_kash.mp3",
      },
      {
        name: "khodkhah",
        url: "https://dl.musicdel.ir/Music/98/10/Music/Mohsen%20Yeganeh%20-%20Khodkhah.mp3",
      },
    ],
  },

  "reza-bahram": {
    name: "Reza Bahram",
    image: "assets/img/rezabahram.jpg",
    songs: [
      {
        name: "Leila",
        url: "https://dl.musicdel.ir/tag/music/1401/03/19/Reza%20Bahram%20-%20Leyla%20(320).mp3",
      },
      {
        name: "Kojaei",
        url: "https://dl.musicdel.ir/Music/1400/12/reza_bahram_kojaei.mp3",
      },
      {
        name: "Sarnevesht",
        url: "https://dl.musicdel.ir/Music/98/04/Music/Reza%20Bahram%20%E2%80%93%20Kaash.mp3",
      },
      {
        name: "Feragh",
        url: "https://dl.musicdel.ir/Music/98/04/Music/Reza%20Bahram%20-%20Az%20Eshgh%20Begoo.mp3",
      },
      {
        name: "Negar",
        url: "https://dl.musicdel.ir/Music/98/10/Music/Reza%20Bahram%20-%20Negar.mp3",
      },
      {
        name: "bad Az to",
        url: "https://dl.musicdel.ir/Music/1401/09/reza_bahram_arameshi_daram.mp3",
      },
      {
        name: "Adam Sabegh",
        url: "https://dl.musicdel.ir/Music/99/04/Music/Reza%20Bahram%20%E2%80%93%20Adame%20Sabegh.mp3",
      },
      {
        name: "Divanegi",
        url: "https://dl.musicdel.ir/Music/1400/05/reza_bahram_bimar%20128.mp3",
      },
      {
        name: "Panah Akhar",
        url: "https://dl.musicdel.ir/tag/music/1401/11/21/Reza%20Bahram%20-%20Panahe%20Akhar%20(320).mp3",
      },
      {
        name: "Mane Divaneh",
        url: "https://dl.musicdel.ir/tag/music/1402/07/05/Reza%20Bahram%20-%20Mane%20Divane%20(320).mp3",
      },
      {
        name: "Pas Az Baran",
        url: "https://dl.musicdel.ir/Music/1403/11/Reza%20Bahram-Pas%20Az%20Baran%20-musicdel.ir.mp3",
      },
      {
        name: "Havaye Del",
        url: "https://dl.musicdel.ir/tag/music/1400/04/11/Reza%20Bahram%20-%20Havaye%20Del%20(320).mp3",
      },
      {
        name: "Eshgh Va Gonah",
        url: "https://dl.musicdel.ir/Music/99/10/Music/Reza%20Bahram%20-%20Eshgho%20Gonah%20(320).mp3",
      },
      {
        name: "Marham",
        url: "https://dl.musicdel.ir/Music/1404/07/Reza%20Bahram-Marham%20-musicdel.ir.mp3",
      },
    ],
  },

  "zaniar-khosravi": {
    name: "Xaniar Khosravi",
    image: "assets/img/zaniar.jpg",
    songs: [
      {
        name: "Bedone To",
        url: "https://dl.musicdel.ir/Music/1400/04/xaniar_khosravi_bedoone_to.mp3",
      },
      {
        name: "Shodi Hame Donyam",
        url: "https://dl.musicdel.ir/Music/1404/01/Xaniar%20-%20Shodi%20Hame%20Donyam.mp3",
      },
      {
        name: "Kamyab",
        url: "https://dl.musicdel.ir/Music/1405/01/Xaniar%20Khosravi-Hesse%20Kamyab%20-musicdel.ir.mp3",
      },
      {
        name: "Nemidoonam",
        url: "https://dl.musicdel.ir/tag/music/1403/08/22/Dekamond%20-%20Nemidunam%20(320).mp3",
      },
      {
        name: "Risk",
        url: "https://dl.musicdel.ir/Music/1401/01/xaniar_khosravi_risk.mp3",
      },
      {
        name: "Jazebeh",
        url: "https://dl.musicdel.ir/Music/1401/01/xaniar_khosravi_jazebe.mp3",
      },
      {
        name: "Nemidooni",
        url: "https://dl.musicdel.ir/Music/1400/05/xaniar_khosravi_nemidooni.mp3",
      },
      {
        name: "Engar",
        url: "https://dl.musicdel.ir/Music/1402/01/xaniar_khosravi_engar.mp3",
      },
      {
        name: "Man Delam Tangeh",
        url: "https://dl.musicdel.ir/Music/1400/10/xaniar_khosravi_man_delam%20tange.mp3",
      },
      {
        name: "Negaranet Mishodam",
        url: "https://dl.musicdel.ir/Music/1400/04/xaniar_khosravi_bedoone_to.mp3",
      },
      {
        name: "Sahm",
        url: "https://dl.musicdel.ir/Music/1400/05/xaniar_khosravi_nemidooni.mp3",
      },
      {
        name: "Nemiram Aghab",
        url: "https://dl.musicdel.ir/Music/1400/04/xaniar_khosravi%20ft.%20sirvan%20khosravi_nemiram_aghab.mp3",
      },
      {
        name: "Age Mimoondi",
        url: "https://dl.musicdel.ir/Music/1401/03/xaniar_khosravi_age_mimoondi.mp3",
      },
      {
        name: "Dalam Vasat Tang Misheh",
        url: "https://dl.musicdel.ir/Music/1404/01/Xaniar%20-%20Ama%20Delam%20Vasat%20Tang%20Mishe.mp3",
      },
    ],
  },
  //---//
  "cold-play": {
    name: "Cold Play",
    image: "assets/img/coldplay4.jpg",
    songs: [{
      name:"Hymn For The Weekend",
      url:"https://dl.musicdagh.ir/songs/best/coldplay/Hymn-For-The-Weekend.mp3"
    },{
      name:"The Scientist",
      url:"https://dl.musicdagh.ir/songs/best/coldplay/The-Scientist.mp3"
    },{
      name:"Adventure Of A Lifetime",
      url:"https://dl.musicdagh.ir/songs/best/coldplay/Adventure-Of-A-Lifetime.mp3"
    },{
      name:"Yellow",
      url:"https://dl.musicdagh.ir/songs/best/coldplay/Yellow.mp3"
    },{
      name:"Viva La Vida",
      url:"https://dl.musicdagh.ir/songs/best/coldplay/Viva-La-Vida.mp3"
    },{
      name:"Fix You",
      url:"https://dl.musicdagh.ir/songs/best/coldplay/Fix-You.mp3"
    },{
      name:"A Sky Full of Stars",
      url:"https://dl.musicdagh.ir/songs/best/coldplay/A-Sky-Full-of-Stars.mp3"
    },{
      name:"Clocks",
      url:"https://dl.musicdagh.ir/songs/best/coldplay/Clocks.mp3"
    },{
      name:"Paradise",
      url:"https://dl.musicdagh.ir/songs/best/coldplay/Paradise.mp3"
    },{
      name:"Something Just Like This",
      url:"https://dl.musicdagh.ir/songs/best/coldplay/Something-Just-Like-This.mp3"
    }],
  },

  "adel": {
    name: "Adel",
    image: "assets/img/adel.jpg",
    songs: [{
      name:"Set Fire to the Rain",
      url:"https://dl.musicdagh.ir/songs/best/adele/Set-Fire-to-the-Rain.mp3"
    },{
      name:"Skyfall",
      url:"https://dl.musicdagh.ir/songs/best/adele/Skyfall.mp3"
    },{
      name:"Hello",
      url:"https://dl.musicdagh.ir/songs/best/adele/Hello.mp3"
    },{
      name:"Rolling in the Deep",
      url:"https://dl.musicdagh.ir/songs/best/adele/Rolling-in-the-Deep.mp3"
    },{
      name:"Someone Like You",
      url:"https://dl.musicdagh.ir/songs/best/adele/Someone-Like-You.mp3"
    },{
      name:"Love In The Dark",
      url:"https://dl.musicdagh.ir/songs/best/adele/Love-In-The-Dark.mp3"
    },{
      name:"Easy On Me",
      url:"https://dl.musicdagh.ir/songs/best/adele/Easy-On-Me.mp3"
    },{
      name:"Oh My God",
      url:"https://dl.musicdagh.ir/songs/best/adele/Oh-My-God.mp3"
    },{
      name:"When We Were Young",
      url:"https://dl.musicdagh.ir/songs/best/adele/When-We-Were-Young.mp3"
    },{
      name:" Can I Get It",
      url:"https://dl.musicdagh.ir/songs/best/adele/Can-I-Get-It.mp3"
    }],
  },

  "harry-style": {
    name: "Harry Styles",
    image: "assets/img/harry.jpg",
    songs: [{
      name:"Falling",
      url:"https://dl.melovy.ir/2022/01/Harry-Styles-Falling1.mp3"
    },{
      name:"Kiwi",
      url:"https://dl.melovy.ir/2022/02/Harry-Styles-Kiwi1.mp3"
    },{
      name:"Meet Me In The Hallway",
      url:"https://dl.melovy.ir/2022/01/Harry-Styles-Meet-Me-In-The-Hallway1.mp3"
    },{
      name:"Sunflower",
      url:"https://dl.melovy.ir/2022/01/Harry-Styles-Sunflower,-Vol.-61.mp3"
    },{
      name:"Canyon Moon",
      url:"https://dl.melovy.ir/2022/01/Harry-Styles-Canyon-Moon1.mp3"
    },{
      name:"From The Dining Table",
      url:"https://dl.melovy.ir/2022/01/Harry-Styles-From-The-Dining-Table1.mp3"
    },{
      name:"To Be So Lonely",
      url:"https://dl.melovy.ir/2022/01/Harry-Styles-To-Be-So-Lonely1.mp3"
    },{
      name:" Fine Line",
      url:"https://dl.melovy.ir/2022/01/Harry-Styles-Fine-Line1.mp3"
    },{
      name:"Carolina",
      url:"https://dl.melovy.ir/2022/01/Harry-Styles-Carolina1.mp3"
    },{
      name:"Only Angel",
      url:"https://dl.melovy.ir/2022/01/Harry-Styles-Only-Angel1.mp3"
    }],
  },

  "shakira": {
    name: "Shakira",
    image: "assets/img/shakira.jpg",
    songs: [{
      name:"Las de la Intuición",
      url:"https://dl.musiccollection.ir/music/1405/04/12/Shakira%20-%20Las%20de%20la%20Intuici%C3%B3n%20(128).mp3"
    },{
      name:"Mon Amour",
      url:"https://dl.musiccollection.ir/music/1405/04/12/Shakira%20-%20Mon%20Amour%20(128).mp3"
    },{
      name:"Dai Dai",
      url:"https://dl.musiccollection.ir/music/1405/04/12/Shakira%20-%20Dai%20(128).mp3"
    },{
      name:"She Wolf",
      url:"https://dl.musiccollection.ir/music/1404/02/14/Shakira%20-%20She%20Wolf%20(128).mp3"
    },{
      name:"Islands",
      url:"https://dl.musiccollection.ir/music/1404/02/14/Shakira%20-%20Islands%20(128).mp3"
    },{
      name:"Rules",
      url:"https://dl.musiccollection.ir/music/1404/02/14/Shakira%20-%20Rules%20(128).mp3"
    },{
      name:"Long Time",
      url:"https://dl.musiccollection.ir/music/1404/02/14/Shakira%20-%20Long%20Time%20(128).mp3"
    },{
      name:"Poem To A Horse",
      url:"https://dl.musiccollection.ir/music/1404/02/14/Shakira%20-%20Poem%20To%20A%20Horse%20(128).mp3"
    },{
      name:"Addicted To You",
      url:"https://dl.musiccollection.ir/music/1403/08/05/Shakira%20-%20Addicted%20To%20You%20(128).mp3"
    },{
      name:"Give It Up To Me",
      url:"https://dl.musiccollection.ir/music/1403/08/05/Shakira%20-%20Give%20It%20Up%20To%20Me%20(128).mp3"
    }],
  },

  "michel-jackson": {
    name: "Michael Jackson",
    image: "assets/img/jaackson.jpg",
    songs: [{
      name:"Beat it",
      url:"https://dl.musicdagh.ir/songs/best/jackson/beat-it.mp3"
    },{
      name:"Smooth Criminal",
      url:"https://dl.musicdagh.ir/songs/best/jackson/smooth-criminal.mp3"
    },{
      name:"Heal the World",
      url:"https://dl.musicdagh.ir/songs/best/jackson/heal-the-world.mp3"
    },{
      name:"Earth Song",
      url:"https://dl.musicdagh.ir/songs/best/jackson/earth-song.mp3"
    },{
      name:"Billie Jean",
      url:"https://dl.musicdagh.ir/songs/best/jackson/billie-jean.mp3"
    },{
      name:"They Dont Care About Us",
      url:"https://dl.musicdagh.ir/songs/best/jackson/they-dont-care-about-us.mp3"
    },{
      name:"dirty diana",
      url:"https://dl.musicdagh.ir/songs/best/jackson/dirty-diana.mp3"
    },{
      name:"Thriller",
      url:"https://dl.musicdagh.ir/songs/best/jackson/thriller.mp3"
    },{
      name:"Give In To Me",
      url:"https://dl.musicdagh.ir/songs/best/jackson/give-in-to-me.mp3"
    },{
      name:"Black or White",
      url:"https://dl.musicdagh.ir/songs/best/jackson/black-or-white.mp3"
    }],
  },

  "rihana": {
    name: " Rihanna",
    image: "assets/img/rihana.jpg",
    songs: [{
      name:"Russian Roulette",
      url:"https://dl.musicdagh.ir/songs/best/rihanna/Russian-Roulette.mp3"
    },{
      name:"Diamonds",
      url:"https://dl.musicdagh.ir/songs/best/rihanna/Diamonds.mp3"
    },{
      name:"The Monster",
      url:"https://dl.musicdagh.ir/songs/best/rihanna/The-Monster.mp3"
    },{
      name:"Stay",
      url:"https://dl.musicdagh.ir/songs/best/rihanna/Stay.mp3"
    },{
      name:"Where Have You Been",
      url:"https://dl.musicdagh.ir/songs/best/rihanna/Where-Have-You-Been.mp3"
    },{
      name:"Love on the Brain",
      url:"https://dl.musicdagh.ir/songs/best/rihanna/Love-on-the-Brain.mp3"
    },{
      name:" Breakin’ Dishes",
      url:"https://dl.musicdagh.ir/songs/best/rihanna/Breakin-Dishes.mp3"
    },{
      name:"Take a Bow",
      url:"https://dl.musicdagh.ir/songs/best/rihanna/Take-a-Bow.mp3"
    },{
      name:"Umbrella",
      url:"https://dl.musicdagh.ir/songs/best/rihanna/Umbrella.mp3"
    },{
      name:"Work",
      url:"https://dl.musicdagh.ir/songs/best/rihanna/Work.mp3"
    }],
  },

  "celindion": {
    name: "Céline Dion",
    image: "assets/img/celindion.jpg",
    songs: [{
      name:"My Heart Will Go On",
      url:"https://dl.musicdagh.ir/songs/best/celine/My-Heart-Will-Go-On.mp3"
    },{
      name:"All By Myself",
      url:"https://dl.musicdagh.ir/songs/best/celine/All-By-Myself.mp3"
    },{
      name:"Because You Loved Me",
      url:"https://dl.musicdagh.ir/songs/best/celine/Because-You-Loved-Me.mp3"
    },{
      name:"To Love You More",
      url:"https://dl.musicdagh.ir/songs/best/celine/To-Love-You-More.mp3"
    },{
      name:" Beauty And The Beast",
      url:"https://dl.musicdagh.ir/songs/best/celine/Beauty-And-The-Beast.mp3"
    },{
      name:"It’s All Coming Back To Me Now",
      url:"https://dl.musicdagh.ir/songs/best/celine/Its-All-Coming-Back-To-Me-Now.mp3"
    },{
      name:"If You Asked Me To",
      url:"https://dl.musicdagh.ir/songs/best/celine/If-You-Asked-Me-To.mp3"
    },{
      name:"The Power Of Love",
      url:"https://dl.musicdagh.ir/songs/best/celine/The-Power-Of-Love.mp3"
    },{
      name:"Where Does My Heart Beat Now",
      url:"https://dl.musicdagh.ir/songs/best/celine/Where-Does-My-Heart-Beat-Now.mp3"
    },{
      name:"That’s The Way It Is",
      url:"https://dl.musicdagh.ir/songs/best/celine/Thats-The-Way-It-Is.mp3"
    }],
  },

  "enrique": {
    name: "Enrique Iglesias",
    image: "assets/img/enrique.jpg",
    songs: [{
      name:"Hero",
      url:"https://dl.musicdagh.ir/songs/best/enrique/Hero.mp3"
    },{
      name:"Bailamos",
      url:"https://dl.musicdagh.ir/songs/best/enrique/Bailamos.mp3"
    },{
      name:"Be With You",
      url:"https://dl.musicdagh.ir/songs/best/enrique/Be-With-You.mp3"
    },{
      name:"Bailando",
      url:"https://dl.musicdagh.ir/songs/best/enrique/Bailando.mp3"
    },{
      name:"I Like It",
      url:"https://dl.musicdagh.ir/songs/best/enrique/I-Like-It.mp3"
    },{
      name:"Escape",
      url:"https://dl.musicdagh.ir/songs/best/enrique/Escape.mp3"
    },{
      name:"Tonight",
      url:"https://dl.musicdagh.ir/songs/best/enrique/Tonight.mp3"
    },{
      name:"Rhythm Divine",
      url:"https://dl.musicdagh.ir/songs/best/enrique/Rhythm-Divine.mp3"
    },{
      name:"Addicted",
      url:"https://dl.musicdagh.ir/songs/best/enrique/Addicted.mp3"
    },{
      name:"Do you know",
      url:"https://dl.musicdagh.ir/songs/best/enrique/Do-you-know.mp3"
    }],
  },

  "charli": {
    name: "Charlie Puth",
    image: "assets/img/charli.webp",
    songs: [{
      name:"Upside Down",
      url:"https://dl.musicgitar.ir/Music/Charlie%20Puth/320/Charlie%20Puth%20-%20Upside%20Down%20%5B320%5D.mp3?_=1"
    },{
      name:"Attention",
      url:"https://dl.musicgitar.ir/Music/Charlie%20Puth/320/Charlie%20Puth%20-%20Attention%20%5B320%5D.mp3?_=2"
    },{
      name:"How Long",
      url:"https://dl.musicgitar.ir/Music/Charlie%20Puth/320/Charlie%20Puth%20-%20How%20Long%20%5B320%5D.mp3?_=3"
    },{
      name:"Mother",
      url:"https://dl.musicgitar.ir/Music/Charlie%20Puth/320/Charlie%20Puth%20-%20Mother%20%5B320%5D.mp3?_=4"
    },{
      name:"Loser",
      url:"https://dl.musicgitar.ir/Music/Charlie%20Puth/320/Charlie%20Puth%20-%20Loser%20%5B320%5D.mp3?_=5"
    },{
      name:"We Dont Talk Anymore",
      url:"https://dl.musicgitar.ir/Music/Charlie%20Puth/320/Charlie%20Puth%20-%20We%20Dont%20Talk%20Anymore%20%5B320%5D.mp3?_=6"
    },{
      name:"After All",
      url:"https://dl.musicgitar.ir/Music/Charlie%20Puth/320/Charlie%20Puth%20-%20After%20All%20%5B320%5D.mp3?_=7"
    },{
      name:"Done For Me",
      url:"https://dl.musicgitar.ir/Music/Charlie%20Puth/320/Charlie%20Puth%20-%20Done%20For%20Me%20%5B320%5D.mp3?_=8"
    },{
      name:"Dangerously",
      url:"https://dl.musicgitar.ir/Music/Charlie%20Puth/320/Charlie%20Puth%20-%20Dangerously%20%5B320%5D.mp3?_=9"
    },{
      name:"If You Leave Me Now",
      url:"https://dl.musicgitar.ir/Music/Charlie%20Puth/320/Charlie%20Puth%20-%20If%20You%20Leave%20Me%20Now%20%5B320%5D.mp3?_=10"
    }],
  },

  "shiren": {
    name: "Ed Sheeran",
    image: "assets/img/sh.jpg",
    songs: [{
      name:"Azizam",
      url:"https://dl.musicdel.ir/tag/music/1404/01/14/Ed%20Sheeran%20-%20Azizam%20(320).mp3"
    },{
      name:"one",
      url:"https://dl.musicdel.ir/Music/1401/11/ed_sheeran_one.mp3"
    },{
      name:"Repeat It",
      url:"https://dl.musicdel.ir/Music/1405/02/Ed%20Sheeran%20Martin%20Garrix-Repeat%20It%20-musicdel.ir.mp3"
    },{
      name:"Camera",
      url:"https://dl.musicdel.ir/Music/1404/06/Ed%20Sheeran-Camera%20-musicdel.ir.mp3"
    },{
      name:"eyes closed",
      url:"https://dl.musicdel.ir/Music/1402/01/ed_sheeran_eyes_closed.mp3"
    },{
      name:"runaway",
      url:"https://dl.musicdel.ir/Music/1401/11/ed_sheeran_runaway.mp3"
    },{
      name:"Symmetry",
      url:"https://dl.musicdel.ir/Music/1404/06/Ed%20Sheeran-Symmetry%20-musicdel.ir.mp3"
    },{
      name:"Opening",
      url:"https://dl.musicdel.ir/Music/1404/06/Ed%20Sheeran-Opening%20-musicdel.ir.mp3"
    },{
      name:"Slowly",
      url:"https://dl.musicdel.ir/Music/1404/06/Ed%20Sheeran-Slowly%20-musicdel.ir.mp3"
    },{
      name:"In Other Words",
      url:"https://dl.musicdel.ir/Music/1404/06/Ed%20Sheeran-In%20Other%20Words%20-musicdel.ir.mp3"
    }],
  },

  "selena-gomez": {
    name: "Selena Gomez",
    image: "assets/img/selena.jpg",
    songs: [{
      name:"Me & My Girls",
      url:"https://dl.noorahang.com/1404/7/List/Selena-Gomez-Musics/Selena%20Gomez%20-%20Me%20%20My%20Girls.mp3"
    },{
      name:"Revival",
      url:"https://dl.noorahang.com/1404/7/List/Selena-Gomez-Musics/Selena%20Gomez%20-%20Revival.mp3"
    },{
      name:"Rise",
      url:"https://dl.noorahang.com/1404/7/List/Selena-Gomez-Musics/Selena%20Gomez%20-%20Rise.mp3"
    },{
      name:"Who Says",
      url:"https://dl.noorahang.com/1404/7/List/Selena-Gomez-Musics/Selena%20Gomez%20-%20Who%20Says.mp3"
    },{
      name:"Love You Like A Love Song",
      url:"https://dl.noorahang.com/1404/7/List/Selena-Gomez-Musics/Selena%20Gomez%20-%20Love%20You%20Like%20A%20Love%20Song.mp3"
    },{
      name:"Hit The Lights",
      url:"https://dl.noorahang.com/1404/7/List/Selena-Gomez-Musics/Selena%20Gomez%20-%20Hit%20The%20Lights.mp3"
    },{
      name:"Lover In Me",
      url:"https://dl.noorahang.com/1404/7/List/Selena-Gomez-Musics/Selena%20Gomez%20-%20Lover%20In%20Me.mp3"
    },{
      name:"Outta My Hands (Loco)",
      url:"https://dl.noorahang.com/1404/7/List/Selena-Gomez-Musics/Selena%20Gomez%20-%20Outta%20My%20Hands%20Loco.mp3"
    },{
      name:"Perfect",
      url:"https://dl.noorahang.com/1404/7/List/Selena-Gomez-Musics/Selena%20Gomez%20-%20Perfect.mp3"
    },{
      name:"Camouflage",
      url:"https://dl.noorahang.com/1404/7/List/Selena-Gomez-Musics/Selena%20Gomez%20-%20Camouflage.mp3"
    }],
  },

  "jenifer-lopez": {
    name: "Jennifer Lopez ",
    image: "assets/img/jenifer.jpg",
    songs: [{
      name:"On My Way",
      url:"https://dl.musiccollection.ir/music/1405/04/12/Jnifer%20lopez%20-%20On%20my%20way%20(128).mp3"
    },{
      name:"Pa Ti",
      url:"https://dl.musiccollection.ir/music/1405/04/12/Jnifer%20lopez%20-%20Pa%20ti%20(128).mp3"
    },{
      name:"Cambia el paso",
      url:"https://dl.musiccollection.ir/music/1405/04/12/Jnifer%20lopez%20-%20Cambia%20el%20paso%20(128).mp3"
    },{
      name:"Get Right",
      url:"https://dl.musiccollection.ir/music/1405/04/12/Jnifer%20lopez%20-%20Get%20right%20(128).mp3"
    },{
      name:"Marry Me",
      url:"https://dl.musiccollection.ir/music/1405/04/12/Jnifer%20lopez%20-%20Marry%20Me%20%20(128).mp3"
    },{
      name:"Me Haces Falta",
      url:"https://dl.musiccollection.ir/music/1404/05/04/Gunde%20-%20Haces%20(128).mp3"
    },{
      name:"Lets Get Loud",
      url:"https://dl.musiccollection.ir/music/1404/05/04/Gunde%20-%20Lets%20Get%20Loud%20(128).mp3"
    },{
      name:"All I Have",
      url:"https://dl.musiccollection.ir/music/1404/05/04/Gunde%20-%20All%20I%20Have%20(128).mp3"
    },{
      name:"Dear Ben",
      url:"https://dl.musiccollection.ir/music/1404/05/04/Gunde%20-%20Dear%20(128).mp3"
    },{
      name:"Hold It Dont Drop It",
      url:"https://dl.musiccollection.ir/music/1404/05/04/Gunde%20-%20Hold%20It%20Dont%20Drop%20It%20(128).mp3"
    }],
  },

  "taylor-swift": {
    name: "Taylor Swift",
    image: "assets/img/taylor3.webp",
    songs: [{
      name:"Blank Space",
      url:"https://dl.musicdagh.ir/songs/best/swift/Blank-Space.mp3"
    },{
      name:"The Lakes",
      url:"https://dl.musicdagh.ir/songs/best/swift/The-Lakes.mp3"
    },{
      name:"Shake It Off",
      url:"https://dl.musicdagh.ir/songs/best/swift/Shake-It-Off.mp3"
    },{
      name:"Lover",
      url:"https://dl.musicdagh.ir/songs/best/swift/Lover.mp3"
    },{
      name:"You Need To Calm Down",
      url:"https://dl.musicdagh.ir/songs/best/swift/You-Need-To-Calm-Down.mp3"
    },{
      name:"Cardigan",
      url:"https://dl.musicdagh.ir/songs/best/swift/Cardigan.mp3"
    },{
      name:"Bad Blood",
      url:"https://dl.musicdagh.ir/songs/best/swift/Bad-Blood.mp3"
    },{
      name:"Style",
      url:"https://dl.musicdagh.ir/songs/best/swift/Style.mp3"
    },{
      name:"Look What You Made Me Do",
      url:"https://dl.musicdagh.ir/songs/best/swift/Look-What-You-Made-Me-Do.mp3"
    },{
      name:"Love Story",
      url:"https://dl.musicdagh.ir/songs/best/swift/Love-Story.mp3"
    }],
  },

  "billieylish": {
    name: "Billie Eilish",
    image: "assets/img/Billieilish.jpg",
    songs: [{
      name:"Six Feet Under",
      url:"https://dl.ememay.ir/2024/09/Billie-Eilish-Six-Feet-Under.mp3"
    },{
      name:"Come Out and Play",
      url:"https://dl.ememay.ir/2024/09/Billie-Eilish-come-out-and-play.mp3"
    },{
      name:"My Boy",
      url:"https://dl.ememay.ir/2024/09/Billie-Eilish-my-boy.mp3"
    },{
      name:"Hostage",
      url:"https://dl.ememay.ir/2024/09/Billie-Eilish-Hostage.mp3"
    },{
      name:"NDA",
      url:"https://dl.ememay.ir/2024/09/Billie-Eilish-NDA.mp3"
    },{
      name:"The 30th",
      url:"https://dl.ememay.ir/2024/09/Billie-Eilish-The-30th.mp3"
    },{
      name:"Lost Cause",
      url:"https://dl.ememay.ir/2024/09/Billie-Eilish-Lost-Cause.mp3"
    },{
      name:"Halley’s Comet",
      url:"https://dl.ememay.ir/2024/09/Billie-Eilish-Halleys-Comet.mp3"
    },{
      name:"My Future",
      url:"https://dl.ememay.ir/2024/09/Billie-Eilish-my-future.mp3"
    },{
      name:"Billie Bossa Nova",
      url:"https://dl.ememay.ir/2024/09/Billie-Eilish-Billie-Bossa-Nova.mp3"
    }],
  },

  "dualipa": {
    name: "Dua Lipa",
    image: "assets/img/dua22.jpg",
    songs: [{
      name:"Physical",
      url:"https://dl.dibasmusic.com/dl/1401/12/Dua-Lipa-Physical-dibamusics-320.mp3"
    },{
      name:"Future Nostalgia",
      url:"https://dl.dibasmusic.com/dl/1401/12/Dua-Lipa-Future-Nostalgia-dibamusics-320.mp3"
    },{
      name:"Break My Heart",
      url:"https://dl.dibasmusic.com/dl/1401/11/Dua-Lipa-Break-My-Heart-dibamusics-320.mp3"
    },{
      name:"Blow Your Mind",
      url:"https://dl.dibasmusic.com/dl/1401/09/Dua-Lipa-Blow-Your-Mind-Mwah-dibamusics.com-320.mp3"
    },{
      name:"Love Again",
      url:"https://dl.dibasmusic.com/song/1401/06/Dua-Lipa-Love-Again-dibamusics-320.mp3"
    },{
      name:"One Kiss",
      url:"https://dl.dibasmusic.com/song/1401/06/Dua-Lipa-One-Kiss-dibamusics-320.mp3"
    },{
      name:"Levitating",
      url:"https://dl.dibasmusic.com/dl/1401/09/Dua-Lipa-Levitating-dibamusics.com-320.mp3"
    }],
  },

  "weekend": {
    name: "The Weeknd",
    image: "assets/img/weekend.jpg",
    songs: [{
      name:"Blinding Lights",
      url:"https://dl.musicdagh.ir/songs/best/Blinding-Lights.flac"
    },{
      name:"Save Your Tears",
      url:"https://dl.musicdagh.ir/songs/best/Save-Your-Tears.flac"
    },{
      name:"Or Nah",
      url:"https://dl.musicdagh.ir/songs/best/Or-Nah.flac"
    },{
      name:"Comin Out Strong",
      url:"https://dl.musicdel.ir/Music/1404/07/Future%20The%20Weeknd-Comin%20Out%20Strong%20-musicdel.ir.mp3"
    },{
      name:"i feel it coming",
      url:"https://dl.musicdel.ir/Music/1400/08/the_weeknd_i_feel%20it%20coming.mp3"
    },{
      name:"Call Out My Name",
      url:"https://dl.musicdel.ir/tag/music/1404/05/13/The%20Weeknd%20-%20Call%20Out%20My%20Name%20(320).mp3"
    },{
      name:"Take Me Back To LA",
      url:"https://dl.musicdel.ir/Music/1404/03/The%20Weeknd-Take%20Me%20Back%20To%20LA%20-musicdel.ir.mp3"
    },{
      name:"Lonely Star",
      url:"https://dl.musicdel.ir/Music/1402/07/the_weeknd_lonely_star.mp3"
    },{
      name:"I Cant Wait To Get There",
      url:"https://dl.musicdel.ir/Music/1404/03/The%20Weeknd-I%20Cant%20Wait%20To%20Get%20There%20-musicdel.ir.mp3"
    },{
      name:"Timeless",
      url:"https://dl.musicdel.ir/Music/1403/05//The%20Weeknd-Timeless%20-musicdel.ir.mp3"
    }],
  },

  "justin-beiber": {
    name: "Justin Bieber",
    image: "assets/img/justin.jpg",
    songs: [{
      name:"Daisies",
      url:"https://dl.musicdel.ir/Music/1405/03/Justin%20Bieber-DAISIES%20-musicdel.ir.mp3"
    },{
      name:"Runaway Love",
      url:"https://dl.musicdel.ir/Music/1402/01/justin_bieber_runaway_love.mp3"
    },{
      name:"stay",
      url:"https://dl.musicdel.ir/Music/1400/05/the_kid%20laroi%20ft%20justin%20bieber_stay.mp3"
    },{
      name:"baby",
      url:"https://dl.musicdel.ir/Music/1400/05/justin_bieber_baby.mp3"
    },{
      name:"Monster",
      url:"https://dl.musicdel.ir/Music/1400/08/justin_bieber_monster.mp3"
    },{
      name:"Love Yourself",
      url:"https://dl.musicdel.ir/tag/music/1403/12/02/justin%20Bieber%20-%20Love%20Yourself%20(320).mp3"
    },{
      name:"All Around The World",
      url:"https://dl.musicdel.ir/Music/1402/01/justin_bieber_all_around_the_world.mp3"
    },{
      name:"Heaven",
      url:"https://dl.musicdel.ir/Music/1403/01/justin_bieber_heaven.mp3"
    },{
      name:"Unstable",
      url:"https://dl.musicdel.ir/Music/1402/01/justin_bieber_unstable.mp3"
    },{
      name:"Love You Different",
      url:"https://dl.musicdel.ir/Music/1402/01/justin_bieber_love_you_different.mp3"
    }],
  },
};

function playSong(song, artist, index) {
  currentArtist = artist;
  currentIndex = index;
  
  audio.src = song.url;
  playerSong.textContent = song.name;
  playerArtist.textContent = artist.name;

  audio.play();
  playIcon.classList.replace("ri-play-large-fill", "ri-pause-fill")
}

function initHomePage() {       
  document.querySelectorAll(".artist-card, .track-card").forEach((card) => {
    card.addEventListener("click", () => {
      const artistKey = card.dataset.artist;
      const artist = artists[artistKey];
      if (artist) {
        renderArtistPage(artist);
      }
    });
  });
  initSliders()
}

function renderArtistPage(artist) {
  app.innerHTML = `
    <button id="backBtn" class="back-btn group">
      <i class="ri-arrow-left-line"></i> Back to Home
    </button>

    <div class="artist-header">
      <img src="${artist.image}" class="artist-img">
      <div class="artist-info">
        <p class="artist-badge">ARTIST</p>
        <h1 class="artist-title">${artist.name}</h1>
        <p class="artist-song-count">
          <i class="ri-music-2-fill text-brand-purple"></i> 
          ${artist.songs.length} Songs Available
        </p>
      </div>
    </div>

    <h2 class="section-title mb-4 text-slate-300">Popular Tracks</h2>

    <div class="flex flex-col gap-3">
    ${artist.songs.map((song, index) => {
      const isPlayingClass = (currentArtist && currentArtist.name === artist.name && currentIndex === index) ? 'is-playing' : '';
      
      return `
      <div class="song-item group ${isPlayingClass}" data-index="${index}">
        <span class="song-index">${index + 1}</span>
        <div class="song-art">
          <img src="${artist.image}" class="w-full h-full object-cover">
        </div>
        <div class="flex-1 min-w-0">
          <p class="song-title">${song.name}</p>
          <p class="song-artist-name">${artist.name}</p>
        </div>
        
        <button class="song-play-btn">
          <i class="ri-play-large-fill"></i>
        </button>

        <div class="song-eq">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
      `;
    }).join("")}
    </div>
  `;

  document.querySelector("#backBtn").addEventListener("click", goBackHome);

  document.querySelector(".main-scroll-area").scrollTo(0, 0)

  const songItems = document.querySelectorAll('.song-item');
  songItems.forEach(item => {
    item.addEventListener('click', () => {
      songItems.forEach(i => i.classList.remove('is-playing'));
      item.classList.add('is-playing');
      
      const index = Number(item.dataset.index);
      const song = artist.songs[index];
      playSong(song, artist, index);
    });
  });
}

function goBackHome() {
  app.innerHTML = homeHTML;
  initHomePage();
  document.querySelector(".main-scroll-area").scrollTo(0, 0);
}

initHomePage();

//-------------play & pause----------//

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playIcon.classList.replace("ri-play-large-fill", "ri-pause-fill");
  } else {
    audio.pause();
    playIcon.classList.replace("ri-pause-fill", "ri-play-large-fill");
  }
});

//---------prev & next music------------//

function playNext() {
  if (!currentArtist) return;
  
  if (isShuffle) {   //shuffle is on
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * currentArtist.songs.length);
    } while (randomIndex === currentIndex && currentArtist.songs.length > 1);
    currentIndex = randomIndex;
  } else {          //shuffle id off
    currentIndex = (currentIndex + 1) % currentArtist.songs.length;
  }
  
  playSong(currentArtist.songs[currentIndex], currentArtist, currentIndex);
  updatePlayingUI();
}

function playPrev() {
  if (!currentArtist) return;
  currentIndex = (currentIndex - 1 + currentArtist.songs.length) % currentArtist.songs.length;
  playSong(currentArtist.songs[currentIndex], currentArtist, currentIndex);
  updatePlayingUI();
}

function updatePlayingUI() {
  document.querySelectorAll('.song-item').forEach(i => i.classList.remove('is-playing'));
  const playingItem = document.querySelector(`.song-item[data-index="${currentIndex}"]`);
  if (playingItem) playingItem.classList.add('is-playing');
}
nextBtn.addEventListener("click", playNext);
prevBtn.addEventListener("click", playPrev);
audio.addEventListener("ended", () => {
  if (repeatMode === 1) {
    audio.currentTime = 0;
    audio.play();
  } 
  else if (repeatMode === 2) {
    playNext();
  } 
  else {         //repeatMode==0 
    if (!isShuffle && currentIndex === currentArtist.songs.length - 1) {
      playIcon.classList.replace("ri-pause-fill", "ri-play-large-fill");
    } else {
      playNext();
    }
  }
});

// --------- Shuffle & Repeat Buttons --------- //


shuffleBtn.addEventListener("click", () => {
  if (repeatMode !== 0) return;

  isShuffle = !isShuffle;    // make toggle
  if (isShuffle) {
    shuffleBtn.classList.add("text-brand-pink");
    repeatBtn.classList.add("opacity-40", "pointer-events-none");
  } else {
    shuffleBtn.classList.remove("text-brand-pink");
    repeatBtn.classList.remove("opacity-40", "pointer-events-none");
  }
});

repeatBtn.addEventListener("click", () => {
  if (isShuffle) return;

  repeatMode = (repeatMode + 1) % 3;   // twice repeat : first for song & second for listsong
  
  if (repeatMode === 0) {
    repeatBtn.classList.remove("text-brand-pink");
    shuffleBtn.classList.remove("opacity-40", "pointer-events-none");
  } else {
    repeatBtn.classList.add("text-brand-pink");
    shuffleBtn.classList.add("opacity-40", "pointer-events-none");
  }
});


// -------------progress bar------------//

audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;

  progressBar.style.setProperty("--progress", `${progress}%`);

  currentTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;

  audio.currentTime = (clickX / width) * audio.duration;
});

//-----------volume bar---------------//

volumeBar.addEventListener("click", (e) => {
  const width = volumeBar.clientWidth;
  const clickX = e.offsetX;
  const newVolume = clickX / width;

  audio.volume = newVolume;
  lastVolume = newVolume; 
  volumeBar.style.setProperty("--progress", `${newVolume * 100}%`);

  if (newVolume > 0) {
    volumeIcon.classList.replace("ri-volume-mute-fill", "ri-volume-up-fill");
  }
});

volumeIcon.addEventListener("click", () => {
  if (audio.volume > 0) {
    lastVolume = audio.volume; 
    audio.volume = 0;
    volumeBar.style.setProperty("--progress", "0%"); 
    volumeIcon.classList.replace("ri-volume-up-fill", "ri-volume-mute-fill"); 
  } else {
    audio.volume = lastVolume;
    volumeBar.style.setProperty("--progress", `${lastVolume * 100}%`); 
    volumeIcon.classList.replace("ri-volume-mute-fill", "ri-volume-up-fill"); 
  }
});

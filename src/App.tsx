/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Headphones, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Location = {
  name: string;
  time?: string;
  description: string;
  isKeyPlace?: boolean;
  imageUrl?: string;
  imageLink?: string;
  hideImage?: boolean;
  casaLink?: string;
  audioLink?: string;
  officialLink?: string;
};

type DayPanel = {
  day: number;
  date: string;
  title: string;
  locations: Location[];
};

const itineraryData: DayPanel[] = [
  {
    day: 1, date: "5/2", title: "抵达东京 —— 入住云端的“原始森林”",
    locations: [
      { 
        time: "晚上", name: "1 Hotel Tokyo", description: "前往赤坂的 1 Hotel Tokyo 办理入住。在 38 层以上的云端感受原生苔藓、大谷石和再生木材构成的“亲自然设计”极简空间。", isKeyPlace: true,
        imageUrl: "https://www.1hotels.com/sites/1hotels.com/files/styles/card/public/brandfolder/2znn98pnfk2cfpv3s7jjc88/1_Hotel_Tokyo_Lounge_areah1280.webp?h=deaec4b9&itok=zKl-oebU",
        casaLink: "https://casabrutus.com/search?q=1+Hotel+Tokyo",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/61adce5844855dc875952c1e"
      }
    ]
  },
  {
    day: 2, date: "5/3", title: "代官山 / 中目黑 —— 质感生活街区与独立品牌",
    locations: [
      { 
        time: "11:00", name: "代官山 T-Site", description: "由 Klein Dytham 建筑事务所设计，颠覆全球书店商业模式的建筑群落。并在旁边的 IVY PLACE 享用早午餐。", isKeyPlace: true,
        imageUrl: "https://store.tsite.jp/static_contents/site/tsite/daikanyama/img/about/key.jpg?time=20240122",
        casaLink: "https://casabrutus.com/search?q=代官山+T-Site",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/601d3606f1dcc7dc22ed9b22"
      },
      { time: "13:30", name: "1LDK apartments.", description: "中目黑标志性买手店，精选男女装与生活杂货。", isKeyPlace: false, imageUrl: "https://onlinestore.1ldkshop.com/contents/wp-content/uploads/2026/03/%E5%90%8D%E7%A7%B0%E6%9C%AA%E8%A8%AD%E5%AE%9A-1-1-scaled.jpg" },
      { time: "14:30", name: "TRAVELER'S FACTORY", description: "TN旅人笔记本全球旗舰店，藏在隐秘巷子里的复古文具天堂。", isKeyPlace: false, hideImage: true },
      { time: "15:30", name: "OKURA (オクラ)", description: "和风浓郁的旧木屋，主打日本传统蓝染工艺服饰与 Boro 拼布单品。", isKeyPlace: false, imageUrl: "https://scontent-nrt6-1.cdninstagram.com/v/t51.82787-15/670866874_18355796272235964_8495462003278812876_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=106&ig_cache_key=Mzg3Nzg3NTYyNDg1MzQ5MTQxMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=-GZpe0V51S8Q7kNvwGrZ9Sc&_nc_oc=AdpFywEixvDdryCPL_yM2qQ9q1TFCOomP1uZ_20WmVxmkev83Y5I-NWz7C9rQfn-vi1y2j6fJ7J-P_u2-9PFWSVO&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-nrt6-1.cdninstagram.com&_nc_gid=5HSt2jDrBB1qPOIjo4wP0g&_nc_ss=7a22e&oh=00_Af0z-VvfQbPBe1XYp_0f0ZmttQHya-20lbVq_LnngwXqIg&oe=69EFD928" },
      { 
        time: "19:00", name: "Narisawa", description: "米其林二星，体验主厨对日本自然生态的饮食哲学表达。", isKeyPlace: true,
        imageUrl: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/1334583/2800mm_x_1420mm_2_wh2bys.jpg",
        casaLink: "https://casabrutus.com/search?q=Narisawa",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/64df2292f7eaefa21d03c737"
      }
    ]
  },
  {
    day: 3, date: "5/4", title: "荻窪 —— 昭和史舞台与和洋折衷庭园",
    locations: [
      { 
        time: "11:00", name: "荻外荘公园", description: "由建筑家伊东忠太设计，发生过“荻窪会谈”等重大历史事件的昭和史核心舞台。", isKeyPlace: true,
        imageUrl: "https://ogikubo3gardens.jp/img/tekigaiso/cover1-pc.jpg",
        casaLink: "https://casabrutus.com/categories/architecture/437513",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/628f4116491ab516515bb554"
      },
      { time: "12:30", name: "荻外荘别栋喫茶室", description: "在小泉诚设计的全新桌椅上，品尝咖啡羊羹搭配有机抹茶。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/628f4116491ab516515bb554", imageUrl: "https://scontent-nrt6-1.cdninstagram.com/v/t51.75761-15/502384171_17905352517178213_3225339950688031329_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=105&ig_cache_key=MzY0NjY1NTIyNDY2MTUxMDgzOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTA3OS5oZHIuQzMifQ%3D%3D&_nc_ohc=305TT-86EjQQ7kNvwEfBUas&_nc_oc=AdojggQ9taQBIlPShSBw1Id23xb_gmRd3U1h4Ov1L4iqwdeK8BHfJL5DlVakPJuXsA8PiGdN7s6En-QrijfkIiTY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-nrt6-1.cdninstagram.com&_nc_gid=7cN6GgWm0ZS5vsT8w2jbOQ&_nc_ss=7a22e&oh=00_Af3kmjGtsPaCYbkEw_wiEIiItRuYdvVfQ487zxlIHhWTMA&oe=69EFD30F" },
      { time: "14:00", name: "荻窪三庭園", description: "漫步于善福寺川静谧住宅区的音乐家故居回游式庭园。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/6131f6a15291baf80eb21cdb", imageUrl: "https://ogikubo3gardens.jp/img/ootaguro/cover4-pc.jpg", officialLink: "https://ogikubo3gardens.jp/" },
      { time: "18:30", name: "神乐坂 虎白", description: "神乐坂的米其林三星，享受极具颠覆感与高级质感的顶级怀石料理。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/656ab35e381662fb52ab27e3", hideImage: true }
    ]
  },
  {
    day: 4, date: "5/5", title: "市谷 —— 活版印刷、昭和摩登与文学记忆",
    locations: [
      { 
        time: "10:30", name: "市谷の杜 本と活字馆", description: "原工厂旧址上复原再生的昭和初期分离派建筑。可免费体验桌面活版印刷机。", isKeyPlace: true,
        imageUrl: "https://ichigaya-letterpress.jp/common/image/og_img.png",
        casaLink: "https://casabrutus.com/search?q=市谷の杜+本と活字館",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/6154378f447a27ebf88eb219"
      },
      { time: "13:00", name: "喫茶ロン", description: "纯正的昭和摩登（Showa Modern）空间肌理，体验正宗“纯喫茶”慢生活。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/60a6311de0f5e723bb71eb71", imageUrl: "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/625363342_18079727273463401_3128607665240894679_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=MzM4OTI4Mzc0MDIxMTExNDY5Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjgzNng4MzYuc2RyLkMzIn0%3D&_nc_ohc=t8XcpajFVhsQ7kNvwHUcX_y&_nc_oc=AdoLHN538GbVpzeYLDC3pfo7wy8vr3RG32KUNJLYLZTLAfPyltojP0p9JrYb-9SIJtfe_FJaDEm9xLhCxg7mtehH&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_gid=JN9pNkhpTnkqACJpQqGQcg&_nc_ss=7a22e&oh=00_Af2Kvpzq7Y9d4ZDQo5iO7CH6Pwhlz3DRMioToLj9gdEk8Q&oe=69EFB428" },
      { time: "18:30", name: "Seizan 晴山", description: "位于三田的米其林二星，在极具季节感的高级割烹氛围中享用晚餐。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/650b21dfb5c00e62057d1eb2", imageUrl: "https://storage.googleapis.com/otoriyose-admin-prd/uploads/%E6%99%B4%E5%B1%B1_TOP__3___1___1_.jpg" }
    ]
  },
  {
    day: 5, date: "5/6", title: "东京转京都 —— 洛中摄影核心区",
    locations: [
      { 
        time: "13:30", name: "八竹庵（旧川崎家住宅）", description: "参观 FATMA HASSONA 等多场 KYOTOGRAPHIE 展览。", isKeyPlace: true,
        imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2024/12/220410_DSC2216_4000-2048x1248.jpg",
        casaLink: "https://casabrutus.com/search?q=八竹庵",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/646c2db57eb0a12e3e551f38"
      },
      { time: "14:30", name: "京都文化博物馆 別館", description: "在辰野金吾设计的红砖西洋建筑内看展。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/61d2d3a31c51dffc5064e9a3", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/12/368451053e4d146b1fd04a02e7d6f1f6-1686x2400.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/linder-sterling/" },
      { time: "15:30", name: "嶋臺（しまだい）ギャラリー", description: "具有 400 年历史的传统建筑中的摄影当代展。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/646c2db57eb0a12e3e551f38", imageUrl: "https://shimadai-gallery.com/wp-content/uploads/2025/04/IMG_0079.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/anton-corbijn/" },
      { time: "19:00", name: "食堂 おがわ", description: "感受吧台氛围极佳的市井神级割烹（极难订位），或选择 Gion Sasaki（米其林三星）。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/612a14e9f73111ba71edcfaf", imageUrl: "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/659413644_18179174446379964_1987458934756460599_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=103&ig_cache_key=MzI4NTY0NDk1MTQyNDkzNzMxMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5oZHIuQzMifQ%3D%3D&_nc_ohc=FG6tWtSa5icQ7kNvwFuksgr&_nc_oc=Adq3GS54Td64rEVX3EGCLaI2GEdQ_mtf1qqVvz3oQVJm3nUeBOb6YcW87x8zz0Zffr9fcSK_M-b2muIOlGCRyU9T&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_gid=oZp8BUpcnk65E3TKmoLORg&_nc_ss=7a22e&oh=00_Af2lyouce7AeUjGD_DKNDy02qouIswKDA-Ubi_lmPXqZpw&oe=69EFBD53" }
    ]
  },
  {
    day: 6, date: "5/7", title: "冈崎文艺区 —— 摄影大师回顾展与南非纪实",
    locations: [
      { 
        time: "11:00", name: "京都市京瓷美术馆", description: "青木淳改造设计。并在馆内 ENFUSE 咖啡厅隔巨大鸟居享用早午餐。", isKeyPlace: true,
        imageUrl: "https://kyotocity-kyocera.museum/wp-content/themes/kyotocity_kyocera_museum/assets/images/ogp.png",
        casaLink: "https://casabrutus.com/search?q=京都市京セラ美術館",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/5fc49ab6e0f5e723bb7e5cbe"
      },
      { time: "14:00", name: "森山大道 回顾展", description: "本届最重磅的森山大道“A Retrospective”回顾大展。", isKeyPlace: true, casaLink: "https://casabrutus.com/search?q=森山大道", audioLink: "https://www.xiaoyuzhoufm.com/episode/615a6b09c5957ab4ba6c82ba", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/11/yokosuka-4800.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/daido-moriyama/" },
      { time: "15:00", name: "ERNEST COLE & PIETER HUGO", description: "聚焦南非历史与纪实的重磅展览连看。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/6311a2fcf8813fa0ac6ad68d", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/12/NN11432116-4800-1639x2400.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/ernest-cole/" },
      { time: "18:30", name: "Monk", description: "主厨每天采摘在地食材并用柴火窑炉烤制披萨和料理（Tabelog 百名店）。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/63b2a658931165bed9c4fcad", imageUrl: "https://scontent-nrt1-2.cdninstagram.com/v/t51.75761-15/491894174_18269332324273367_2710578025869041713_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=101&ig_cache_key=MzYyMjE3MDAzMTQ2OTUxODAwNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=hNYbzvj9J-IQ7kNvwFK4jfA&_nc_oc=Ado3T_Dvnp43Ikqa0aKO-2dqgxMcGfEGeLpIHZdRnSqtW_KK1c5AA6A-6x84OMvMG6KdPlIPhhDpA4Jtdefp8ore&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&_nc_gid=djgQOvGXsYYKd_M5MvPshQ&_nc_ss=7a22e&oh=00_Af0Mon9q6kPadW1V6VO9aXQzNYHJokhcTqC4MRFo3WyCpw&oe=69EFD4C6" }
    ]
  },
  {
    day: 7, date: "5/8", title: "岚山清幽与町屋内的超现实色彩",
    locations: [
      { 
        time: "11:00", name: "岚山 福田美术馆", description: "安田幸一设计，隔着玻璃长窗面对保津川和渡月桥享用简餐。", isKeyPlace: true,
        imageUrl: "https://fukuda-art-museum.jp/wp/wp-content/uploads/2020/11/og_image.jpg",
        casaLink: "https://casabrutus.com/search?q=福田美術館",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/61823eb9ccefb250e38a2e58"
      },
      { time: "13:30", name: "誉田屋源兵卫", description: "近 300 年历史的带匠老铺，在“竹院の間”和“黑藏”欣赏前卫展览。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/6361c479421f57ec0ec268d8", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/12/Heroes_del_Brillo_02-2048x1429.jpeg", imageLink: "https://www.kyotographie.jp/programs/2026/federico-estol/" },
      { time: "15:00", name: "有斐斋弘道馆", description: "江户时代的儒学道场遗址内的沉浸式光影展。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/6215e4fbe1b3b28b7e2cc4a3", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/11/16-DSCF3248_RGB-4800-2048x1536.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/juliette-agnel/" },
      { time: "19:00", name: "岚山 𠮷村 (Arashiyama Yoshimura)", description: "吃一份极致的手打荞麦面。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/641029283e9b1da98471557a", imageUrl: "https://yoshimura-gr.com/arashiyama/images/top/top-main4.jpg", imageLink: "https://yoshimura-gr.com/arashiyama/" }
    ]
  },
  {
    day: 8, date: "5/9", title: "摄影书市集与祗园的前卫夜行",
    locations: [
      { 
        time: "11:00", name: "京都 ROHM Theatre", description: "现代主义巨匠前川国男设计，在 京都 Modern Terrace 享用和风早午餐。", isKeyPlace: true,
        imageUrl: "https://rohmtheatrekyoto.jp/wp-content/themes/rohmtheatrekyoto/img/ogphome.jpg",
        casaLink: "https://casabrutus.com/search?q=ロームシアター京都",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/60b0e513e0f5e723bb7e68fa"
      },
      { time: "13:30", name: "KYOTOGRAPHIE Photobook Fair", description: "在此淘独立摄影书并与世界各地的影像艺术家面对面交流。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/646c2db57eb0a12e3e551f38", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2026/03/KGbf_banner260312-A1.gif" },
      { time: "16:00", name: "ASPHODEL & ygion", description: "漫步祗园鸭川旁的当代多功能艺术空间看展。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/646c2db57eb0a12e3e551f38", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/11/08_SariShibata-2048x1536.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/sari-shibata/" },
      { time: "19:00", name: "VelRosier", description: "米其林二星，体验极具颠覆性的现代中华/法式融合料理。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/656ab35e381662fb52ab27e3", hideImage: true }
    ]
  },
  {
    day: 9, date: "5/10", title: "京都站周边宏大叙事与街区卫星展",
    locations: [
      { 
        time: "11:00", name: "Kaikado Café (开化堂咖啡)", description: "由丹麦 OEO Studio 改造的百年旧电车车库，用精密手工铜制器皿喝咖啡。", isKeyPlace: true,
        imageUrl: "https://www.kaikado-cafe.jp/images/header_img01.jpg",
        casaLink: "https://casabrutus.com/search?q=開化堂カフェ",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/5eba1a2ae0f5e723bb410d54"
      },
      { time: "13:30", name: "東本願寺 大玄関", description: "在宏大的木造空间内观看 LEBOHANG KGANYE 的艺术展。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/5f854ca6e0f5e723bb35bdc9", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/12/Gladys-2022-2.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/lebohang-kganye/" },
      { time: "15:00", name: "重信会馆", description: "探访废弃遗迹摄影大师双人组的展览。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/646c2db57eb0a12e3e551f38", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/12/c803d74b-86ff-49a9-b633-3d83e9633402-Ruines-de-Paris-2024-4800-2048x1639.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/yves-marchand-romain-meffre/" },
      { time: "16:30", name: "出町桝形商店街 DELTA", description: "感受艺术与市井长屋商店街的完美融合。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/61e05a839e99c824c966468a", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2026/03/Kyotographie-Thandiwe-Muriu-1-Current-Copy-1600x2400.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/arp-thandiwe-muriu/" },
      { time: "18:30", name: "cenci", description: "米其林一星，平安神宫旁红砖餐厅内的意式料理创新。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/650b21dfb5c00e62057d1eb2", hideImage: true }
    ]
  },
  {
    day: 10, date: "5/11", title: "京都回北京 —— 缓慢的告别",
    locations: [
      { 
        time: "09:00", name: "鸭川", description: "早上在京都的町屋醒来，去鸭川边散个步。在附近的独立咖啡馆喝一杯手冲。", isKeyPlace: false,
        hideImage: true
      },
      { time: "14:00", name: "KIX 关西国际机场", description: "带着买到的摄影书和满满的看展记忆，前往机场飞回北京。", isKeyPlace: false, hideImage: true }
    ]
  }
];

const DayDetail = ({ activeDayData }: { activeDayData: DayPanel }) => {
  return (
    <motion.div 
      key={activeDayData.day}
      initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      exit={{ opacity: 0, filter: "blur(8px)", y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl mx-auto w-full origin-top relative"
    >
      <div className="mb-12 lg:mb-16">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "2rem" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="h-[1px] bg-[#8C867A] mb-6"
        />
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C867A]">Highlight Selection</span>
        <h2 className="text-3xl md:text-[2.75rem] lg:text-[3.25rem] font-serif mt-5 leading-[1.15] text-[#2c2a29] tracking-tight">{activeDayData.title.split(' —— ')[1] || activeDayData.title.split(' —— ')[0]}</h2>
        <p className="mt-6 lg:mt-8 font-serif text-base md:text-lg text-[#8C867A] leading-relaxed max-w-xl italic">
          {activeDayData.title}
        </p>
      </div>

      {/* Locations List */}
      <div className="space-y-12 lg:space-y-16">
        {activeDayData.locations.map((loc, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            key={idx} 
            className="flex flex-col sm:flex-row gap-6 md:gap-12 group"
          >
             {!loc.hideImage && (
               <div className="w-full sm:w-[32%] shrink-0">
                 <div className="aspect-[3/4] bg-[#F2F0ED] rounded-sm border border-[#DCD9D4] overflow-hidden flex items-center justify-center relative shadow-sm">
                    {loc.imageUrl ? (
                      loc.imageLink ? (
                        <a href={loc.imageLink} target="_blank" rel="noopener noreferrer" className="absolute inset-0 w-full h-full block">
                          <img src={loc.imageUrl} alt={loc.name} className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-all duration-[1.5s] group-hover:scale-110 group-hover:opacity-100 ease-[0.22,1,0.36,1]" />
                        </a>
                      ) : (
                        <img src={loc.imageUrl} alt={loc.name} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 transition-all duration-[1.5s] group-hover:scale-110 group-hover:opacity-100 ease-[0.22,1,0.36,1]" />
                      )
                    ) : (
                      <span className="font-sans text-[10px] text-[#8C867A] uppercase tracking-widest text-center px-4 opacity-50 relative z-10 transition-opacity duration-500 group-hover:opacity-100">Visual<br/>Reference</span>
                    )}
                    {loc.time && <span className="absolute bottom-4 left-4 font-mono text-[9px] text-[#FAF9F7] bg-[#222]/80 px-2 py-1 uppercase tracking-widest z-10 backdrop-blur-md rounded-sm border border-white/10 pointer-events-none">{loc.time}</span>}
                 </div>
               </div>
             )}
            <div className="flex-1 border-t border-[#EBE8E4] pt-5 relative">
              <div className="absolute top-0 right-0 w-8 h-[1px] bg-[#222] transition-all duration-1000 ease-[0.22,1,0.36,1] group-hover:w-full opacity-0 group-hover:opacity-20" />
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-sans text-[9px] text-[#8C867A] uppercase tracking-[0.2em] mb-2.5">{loc.isKeyPlace ? 'Key Destination' : 'Exploration'}</p>
                  <h3 className="text-xl md:text-[1.35rem] font-serif tracking-tight text-[#222] transition-colors duration-500">{loc.name}</h3>
                </div>
                
                <p className="text-[13px] md:text-sm leading-[1.8] font-sans text-[#646059]">
                  {loc.description}
                </p>

                <div className="flex gap-2.5 flex-wrap mt-2">
                  {loc.casaLink && (
                    <a 
                      href={loc.casaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 px-4 rounded-full border border-[#EBE8E4] flex items-center justify-center hover:border-[#222] hover:bg-[#222] hover:text-[#FAF9F7] transition-all duration-500 font-sans text-[9px] uppercase tracking-widest text-[#8C867A] group/btn"
                      title="Read on Casa BRUTUS"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 opacity-70 group-hover/btn:opacity-100" />
                      Casa BRUTUS
                    </a>
                  )}
                  {loc.officialLink && (
                    <a 
                      href={loc.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 px-4 rounded-full border border-[#EBE8E4] flex items-center justify-center hover:border-[#222] hover:bg-[#222] hover:text-[#FAF9F7] transition-all duration-500 font-sans text-[9px] uppercase tracking-widest text-[#8C867A] group/btn"
                      title="Official Website"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 opacity-70 group-hover/btn:opacity-100" />
                      Official Website
                    </a>
                  )}
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 shrink-0 rounded-full border border-[#EBE8E4] flex items-center justify-center hover:border-[#222] hover:bg-[#222] hover:text-[#FAF9F7] transition-all duration-500 text-[#8C867A] group/btn"
                    title="Navigate to Google Maps"
                  >
                    <MapPin className="w-3.5 h-3.5 opacity-70 group-hover/btn:opacity-100" />
                  </a>
                  {loc.audioLink && (
                    <a 
                      href={loc.audioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 shrink-0 rounded-full border border-[#EBE8E4] bg-[#F2F0ED]/50 flex items-center justify-center hover:border-[#222] hover:bg-[#222] hover:text-[#FAF9F7] transition-all duration-500 text-[#8C867A] group/btn"
                      title="Listen on Xiaoyuzhou"
                    >
                      <Headphones className="w-3.5 h-3.5 opacity-70 group-hover/btn:opacity-100" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [openDay, setOpenDay] = useState<number>(1);
  
  const activeDayData = itineraryData.find(d => d.day === openDay) || itineraryData[0];

  return (
    <div className="h-screen w-full bg-[#F2F0ED] text-[#333333] font-serif overflow-hidden flex flex-col">
      {/* Top Navigation Bar */}
      <header className="w-full py-4 md:py-8 px-6 md:px-12 flex flex-col sm:flex-row justify-between items-baseline border-b border-[#DCD9D4] shrink-0">
        <div>
          <h1 className="text-3xl lg:text-4xl tracking-tight text-[#222]">
            10 DAYS <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] mt-2 sm:mt-0 block sm:inline sm:ml-4 text-[#8C867A]">Tokyo & Kyoto / Architecture & KYOTOGRAPHIE</span>
          </h1>
        </div>
        <div className="flex gap-4 md:gap-8 font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C867A] mt-4 sm:mt-0">
          <span>Volume 01</span>
          <span>Spring 2026</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar: The 10-Day Itinerary List */}
        <nav className="w-full lg:w-[320px] lg:border-r border-[#DCD9D4] flex flex-col bg-[#FAF9F7] shrink-0 overflow-y-auto h-full lg:border-b-0">
          <div className="p-4 md:p-6 border-b border-[#DCD9D4] bg-white sticky top-0 z-10 shrink-0 shadow-sm lg:shadow-none">
            <p className="font-sans text-[11px] uppercase tracking-widest text-[#8C867A] mb-1">Overview</p>
            <h2 className="text-xl">The Journey</h2>
          </div>
          <div className="flex-1 font-sans text-sm pb-12 lg:pb-0">
            {itineraryData.map((dayData) => {
              const isActive = openDay === dayData.day;
              return (
                <div key={dayData.day} className="flex flex-col bg-white">
                  <div 
                    onClick={() => setOpenDay(dayData.day)}
                    className={`p-5 md:p-6 border-b lg:border-b flex flex-col sm:flex-row justify-between sm:items-center cursor-pointer transition-all duration-700 relative group overflow-hidden ${
                      isActive 
                        ? 'border-[#DCD9D4] bg-[#FAF9F7]' 
                        : 'border-[#EBE8E4] bg-white hover:bg-[#FAF9F7]'
                    }`}
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#222] transition-all duration-700 ease-[0.22,1,0.36,1] origin-top ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 group-hover:scale-y-50 group-hover:opacity-20'}`} />
                    <span className={`transition-all duration-700 ease-[0.22,1,0.36,1] ${isActive ? 'text-[#222] translate-x-2' : 'text-[#8C867A] group-hover:translate-x-1'}`}>
                      <span className="font-sans font-medium text-[10px] uppercase tracking-widest block sm:inline">DAY {dayData.day.toString().padStart(2, '0')}</span> 
                      <span className="mt-1 sm:mt-0 sm:ml-4 font-serif italic text-[15px] block sm:inline">{dayData.title.split(' —— ')[0]}</span>
                    </span>
                    <span className={`font-mono text-[10px] mt-3 sm:mt-0 transition-all duration-700 ease-[0.22,1,0.36,1] ${isActive ? 'opacity-100 text-[#222]' : 'opacity-40 text-[#8C867A]'}`}>{dayData.date}</span>
                  </div>
                  
                  {/* Mobile Accordion Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden overflow-hidden bg-white"
                      >
                        <div className="px-6 py-10 border-b border-[#DCD9D4]">
                          <DayDetail activeDayData={activeDayData} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Main Content: Day Detail (Desktop) */}
        <section className="hidden lg:flex flex-1 bg-white p-6 md:p-12 lg:p-16 flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden relative">
          <AnimatePresence mode="wait">
            <DayDetail key={activeDayData.day} activeDayData={activeDayData} />
          </AnimatePresence>
        </section>
      </main>

      {/* Bottom Status/Interactive Bar */}
      <footer className="w-full py-4 px-6 md:px-12 border-t border-[#DCD9D4] bg-[#FAF9F7] flex justify-between items-center shrink-0">
        <div className="flex gap-6 font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C867A]">
          <span>{openDay.toString().padStart(2, '0')} / 10 Total Journey</span>
          <span className="hidden sm:inline">Syncing to Xiaoyuzhou</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block h-1 w-32 bg-[#EBE8E4] rounded-full overflow-hidden">
            <div className="h-full bg-[#8C867A] transition-all duration-500 delay-100" style={{ width: `${(openDay / 10) * 100}%` }}></div>
          </div>
          <span className="font-sans text-[10px] text-[#8C867A]">{Math.round((openDay / 10) * 100)}% Complete</span>
        </div>
      </footer>
    </div>
  );
}

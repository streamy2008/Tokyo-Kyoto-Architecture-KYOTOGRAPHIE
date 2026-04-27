/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MapPin, Headphones, ExternalLink, ArrowLeft, Menu, X } from 'lucide-react';
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
  titleLink?: string;
  locations: Location[];
};

const itineraryData: DayPanel[] = [
  {
    day: 1, date: "5/2", title: "北京-东京\n15:30-20:00\n首都T3-羽田T3 —— 入住云端的“原始森林”",
    titleLink: "https://a.feizhu.com/0sZkGx",
    locations: [
      { 
        time: "23:00", name: "1 Hotel Tokyo (2/5--6/5)", description: "前往赤坂的 1 Hotel Tokyo 办理入住。在 38 层以上的云端感受原生苔藓、大谷石和再生木材构成的“亲自然设计”极简空间。", isKeyPlace: true,
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
        time: "11:00", name: "代官山 T-Site", description: "由 Klein Dytham 建筑事务所设计，颠覆全球书店商业模式的建筑群落，在此流连感受茑屋书店的文化氛围。", isKeyPlace: true,
        imageUrl: "https://store.tsite.jp/static_contents/site/tsite/daikanyama/img/about/key.jpg?time=20240122",
        casaLink: "https://casabrutus.com/search?q=代官山+T-Site",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/601d3606f1dcc7dc22ed9b22"
      },
      {
        time: "12:15", name: "レカマヤジフ (Rekamayajifu)",
        description: "名门中华出身的主厨掌勺，提供世间罕见的“咖喱分解套餐”。将咖喱的混合香料逐一分解，带你体验一场极具创意与深度的香料之旅。",
        isKeyPlace: true,
        casaLink: "https://casabrutus.com/categories/food/170872",
        imageUrl: "https://tokyo-kyoto.oss-cn-beijing.aliyuncs.com/0105fujiyamacurry19_1104.jpeg"
      },
      { time: "13:30", name: "1LDK apartments.", description: "中目黑标志性买手店，精选男女装与生活杂货。对面就是目黑川，是街区质感生活的窗口。", isKeyPlace: false, imageUrl: "https://onlinestore.1ldkshop.com/contents/wp-content/uploads/2026/03/%E5%90%8D%E7%A7%B0%E6%9C%AA%E8%A8%AD%E5%AE%9A-1-1-scaled.jpg", audioLink: "https://www.xiaoyuzhoufm.com/episode/601d3606f1dcc7dc22ed9b22" },
      { 
        time: "14:15", name: "visvim NAKAMEGURO", 
        description: "中村世纪的中目黑旗舰展示空间。空间设计融合了传统木工与现代艺术感，展示男装全系列及其独特的‘Future Luddite’美学。", 
        isKeyPlace: true, 
        imageUrl: "https://www.visvim.tv/jp/dissertation/img/pht_wmv_v_tokyo_12.jpg",
        officialLink: "https://www.visvim.tv/",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/66416f406ab15a81ca040713"
      },
      { 
        time: "15:00", name: "vendor (COVERCHORD)", 
        description: "nonnative 的实体旗舰店，Coverchord 的线下灵魂所在地，代表了中目黑的‘城市户外’机能美学。", 
        isKeyPlace: false, 
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTch8-0G90d6lSjKg0wVIzlMApby4V7sduz4dbKTYnqZe_eHdIpZWq_N04&s=10",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/66416f406ab15a81ca040713"
      },
      { 
        time: "19:00", name: "乃木坂 結yui", description: "米其林一星主厨增山刚主理。以四川料理为基础融入和风元素，追求“日式洗练”的全新高度。", isKeyPlace: true,
        imageUrl: "https://wp2022.casabrutus.com/wp-content/uploads/2021/06/0622yui_1200.jpg",
        casaLink: "https://casabrutus.com/categories/food/190548"
      }
    ]
  },
  {
    day: 3, date: "5/4", title: "荻窪 —— 昭和史舞台与和洋折衷庭园",
    locations: [
  {
    "time": "11:00",
    "name": "欧風カレー トマト (Tomato)",
    "description": "荻窪排名第一、常年居于 Tabelog 日本咖喱榜首的传奇名店。36 种香料精心勾勒出的极致欧风咖喱。推荐必吃：和牛牛肉咖喱配芝士（和牛ビーフカレー）。",
    "isKeyPlace": true,
    "imageUrl": "https://www.chuosen-rr.com/wp/wp-content/uploads/2020/02/interview15-12.jpg"
  },
  {
    "time": "14:00",
    "name": "荻外荘公园",
    "description": "由建筑家伊东忠太设计，发生过“荻窪会谈”等重大历史事件的昭和史核心舞台。",
    "isKeyPlace": true,
    "imageUrl": "https://ogikubo3gardens.jp/img/tekigaiso/cover1-pc.jpg",
    "casaLink": "https://casabrutus.com/categories/architecture/437513",
    "audioLink": "https://www.xiaoyuzhoufm.com/episode/628f4116491ab516515bb554"
  },
  {
    "time": "15:30",
    "name": "荻外荘别栋喫茶室",
    "description": "在小泉诚设计的全新桌椅上，品尝咖啡羊羹搭配有机抹茶。",
    "isKeyPlace": true,
    "audioLink": "https://www.xiaoyuzhoufm.com/episode/628f4116491ab516515bb554",
    "imageUrl": "https://scontent-nrt6-1.cdninstagram.com/v/t51.75761-15/502384171_17905352517178213_3225339950688031329_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=105&ig_cache_key=MzY0NjY1NTIyNDY2MTUxMDgzOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTA3OS5oZHIuQzMifQ%3D%3D&_nc_ohc=305TT-86EjQQ7kNvwEfBUas&_nc_oc=AdojggQ9taQBIlPShSBw1Id23xb_gmRd3U1h4Ov1L4iqwdeK8BHfJL5DlVakPJuXsA8PiGdN7s6En-QrijfkIiTY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-nrt6-1.cdninstagram.com&_nc_gid=7cN6GgWm0ZS5vsT8w2jbOQ&_nc_ss=7a22e&oh=00_Af3kmjGtsPaCYbkEw_wiEIiItRuYdvVfQ487zxlIHhWTMA&oe=69EFD30F"
  },
  {
    "time": "16:30",
    "name": "荻窪三庭园",
    "description": "漫步于善福寺川静谧住宅区的音乐家故居回游式庭园。",
    "isKeyPlace": true,
    "audioLink": "https://www.xiaoyuzhoufm.com/episode/628f4116491ab516515bb554",
    "imageUrl": "https://ogikubo3gardens.jp/img/ootaguro/cover4-pc.jpg",
    "officialLink": "https://ogikubo3gardens.jp/"
  },
  {
    "time": "18:30",
    "name": "すし家 祥太 (Sushiya Shota)",
    "description": "位于麻布十番的江户前寿司名店。韩国主厨受名作《将太的寿司》启发而赴日学艺，其精湛的技艺与绝佳的味道成就了漫画般的现实传奇。",
    "isKeyPlace": true,
    "imageUrl": "https://wp2022.casabrutus.com/wp-content/uploads/2020/01/0121syota_1200.jpg",
    "casaLink": "https://casabrutus.com/categories/food/129000"
  }
]
  },
  {
    day: 4, date: "5/5", title: "市谷 —— 活版印刷、昭和摩登与文学记忆",
    locations: [
  {
    "time": "11:00",
    "name": "喫茶ロン",
    "description": "在此享用昭和风情早午餐。纯正的昭和摩登（Showa Modern）空间肌理，体验正宗“纯喫茶”慢生活。推荐必点：厚烧玉子三明治（たまごサンド）以及招牌混合咖啡。",
    "isKeyPlace": true,
    "audioLink": "https://www.xiaoyuzhoufm.com/episode/60a6311de0f5e723bb71eb71",
    "imageUrl": "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/625363342_18079727273463401_3128607665240894679_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=MzM4OTI4Mzc0MDIxMTExNDY5Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjgzNng4MzYuc2RyLkMzIn0%3D&_nc_ohc=t8XcpajFVhsQ7kNvwHUcX_y&_nc_oc=AdoLHN538GbVpzeYLDC3pfo7wy8vr3RG32KUNJLYLZTLAfPyltojP0p9JrYb-9SIJtfe_FJaDEm9xLhCxg7mtehH&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_gid=JN9pNkhpTnkqACJpQqGQcg&_nc_ss=7a22e&oh=00_Af2Kvpzq7Y9d4ZDQo5iO7CH6Pwhlz3DRMioToLj9gdEk8Q&oe=69EFB428"
  },
  {
    "time": "13:00",
    "name": "市谷の杜 本と活字馆",
    "description": "原工厂旧址上复原再生的昭和初期分离派建筑。可免费体验桌面活版印刷机。",
    "isKeyPlace": true,
    "imageUrl": "https://ichigaya-letterpress.jp/common/image/og_img.png",
    "casaLink": "https://casabrutus.com/search?q=市谷の杜+本和活字館",
    "audioLink": "https://www.xiaoyuzhoufm.com/episode/6154378f447a27ebf88eb219"
  },
  {
    "time": "15:00",
    "name": "赤城神社 (Akagi Shrine)",
    "description": "由隈研吾主持设计的“日本最美现代化神社”。玻璃幕墙与时尚住宅融为一体，彻底颠覆传统神社的视觉逻辑。",
    "isKeyPlace": true,
    "imageUrl": "https://www.gotokyo.org/shared/site_gotokyo/images/event/2021/210323_akagijinja/main.jpg",
    "casaLink": "https://casabrutus.com/search?q=赤城神社",
    "hideImage": true
  },
  {
    "time": "16:30",
    "name": "神乐坂“捉迷藏”小巷",
    "description": "漫步于神乐坂的石板路窄巷（如捉迷藏横丁、兵库坂）。这里曾是艺伎出入的繁华地，保留着极具质感的料亭与曲径通幽感。",
    "isKeyPlace": false,
    "imageUrl": "https://www.gotokyo.org/en/destinations/central-tokyo/kagurazaka/images/sub_main.jpg",
    "hideImage": true
  },
  {
    "time": "18:00",
    "name": "Karimoku Commons Tokyo",
    "description": "一整栋的复合概念空间，由Karimoku策展。1楼设有不定期主题展（如MAS品牌的桧木主题）；2楼及3楼提出“融合”的设计概念，分别展示Karimoku Case(KC)与Karimoku New Standard(KNS)系列家具，将建筑、家具工艺与艺术完美统合；4楼顶层视野开阔。这里为概念展示店（不直接售卖家具）。",
    "isKeyPlace": true,
    "officialLink": "https://www.motiveshowroom.com/products/karimokucommonstokyo",
    "imageUrl": "https://shoplineimg.com/5aeef8cf0e64fefb0600a373/679d760a7a4ce619a7cbd7a6/800x.webp?source_format=jpg"
  },
  {
    "time": "19:30",
    "name": "Chinese Restaurant 漢",
    "description": "曾任东京文华东方酒店中餐厅烤肉主厨的店主独立开设的正宗广东料理。提供超高性价比的丰富单品，堪称新一代的“街中华”。",
    "isKeyPlace": true,
    "imageUrl": "https://wp2022.casabrutus.com/wp-content/uploads/2019/12/1227kan_1200.jpg",
    "casaLink": "https://casabrutus.com/categories/food/127546"
  }
]
  },
  {
    day: 5, date: "5/6", title: "东京-京都 —— 洛中摄影核心区",
    locations: [
      { 
        time: "12:00", name: "ル・セル (Le Sel)", description: "由东京西麻布一星餐厅“Crony”在京都打造的有机拉面店。采用从小菜开始，到拉面和甜点结束的类似小怀石料理的形式，并且全部采用有机食材。", isKeyPlace: true,
        imageUrl: "https://wp2022.casabrutus.com/wp-content/uploads/2019/05/0523le-sel_1200.jpg",
        casaLink: "https://casabrutus.com/categories/food/106208"
      },
      { 
        time: "13:30", name: "八竹庵（旧川崎家住宅）", description: "参观 FATMA HASSONA 等多场 KYOTOGRAPHIE 展览。", isKeyPlace: true,
        imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2024/12/220410_DSC2216_4000-2048x1248.jpg",
        casaLink: "https://casabrutus.com/search?q=八竹庵",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/661266ed13fe0a1d48ce4626"
      },
      { time: "14:30", name: "京都文化博物馆 別館", description: "在辰野金吾设计的红砖西洋建筑内看展。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/661266ed13fe0a1d48ce4626", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/12/368451053e4d146b1fd04a02e7d6f1f6-1686x2400.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/linder-sterling/" },
      { time: "15:30", name: "嶋臺（しまだい）ギャラリー", description: "具有 400 年历史的传统建筑中的摄影当代展。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/661266ed13fe0a1d48ce4626", imageUrl: "https://shimadai-gallery.com/wp-content/uploads/2025/04/IMG_0079.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/anton-corbijn/" },
      { time: "19:00", name: "食堂 おがわ", description: "感受吧台氛围极佳的市井神级割烹（极难订位），或选择 Gion Sasaki（米其林三星）。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/612a14e9f73111ba71edcfaf", imageUrl: "https://scontent-nrt1-1.cdninstagram.com/v/t51.82787-15/659413644_18179174446379964_1987458934756460599_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=103&ig_cache_key=MzI4NTY0NDk1MTQyNDkzNzMxMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5oZHIuQzMifQ%3D%3D&_nc_ohc=FG6tWtSa5icQ7kNvwFuksgr&_nc_oc=Adq3GS54Td64rEVX3EGCLaI2GEdQ_mtf1qqVvz3oQVJm3nUeBOb6YcW87x8zz0Zffr9fcSK_M-b2muIOlGCRyU9T&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_gid=oZp8BUpcnk65E3TKmoLORg&_nc_ss=7a22e&oh=00_Af2lyouce7AeUjGD_DKNDy02qouIswKDA-Ubi_lmPXqZpw&oe=69EFBD53" },
      { 
        time: "20:00", name: "Malda Kyoto (6/5--9/5)", 
        description: "地处京都心脏河原町/乌丸御池宁静小巷，客房兼具设计感与宽敞空间。住客公认的最大亮点是备受赞誉的素食早餐，采用应季蔬菜精心烹制。服务评分普遍高达 9.6 以上，提供如家般的舒适体验。", 
        isKeyPlace: true, 
        imageUrl: "https://images.squarespace-cdn.com/content/v1/5e1eb5436fe19076661fee5d/1580946544674-4EGC7XCFJI2XSSD69M9I/0-31%2Bcopy.jpg?format=750w",
        officialLink: "https://www.maldakyoto.com/"
      }
    ]
  },
  {
    day: 6, date: "5/7", title: "冈崎文艺区 —— 摄影大师回顾展与南非纪实",
    locations: [
      { 
        time: "11:00", name: "京都市京瓷美术馆", description: "青木淳改造设计。并在馆内 ENFUSE 咖啡厅隔巨大鸟居享用早午餐。", isKeyPlace: true,
        imageUrl: "https://kyotocity-kyocera.museum/wp-content/themes/kyotocity_kyocera_museum/assets/images/ogp.png",
        casaLink: "https://casabrutus.com/search?q=京都市京セラ美術館",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/60b64f3e44855dc87595304b"
      },
      { time: "14:00", name: "森山大道 回顾展", description: "本届最重磅的森山大道“A Retrospective”回顾大展。", isKeyPlace: true, casaLink: "https://casabrutus.com/search?q=森山大道", audioLink: "https://www.xiaoyuzhoufm.com/episode/661266ed13fe0a1d48ce4626", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/11/yokosuka-4800.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/daido-moriyama/" },
      { time: "15:00", name: "ERNEST COLE & PIETER HUGO", description: "聚焦南非历史与纪实的重磅展览连看。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/661266ed13fe0a1d48ce4626", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/12/NN11432116-4800-1639x2400.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/ernest-cole/" },
      { time: "18:30", name: "Monk", description: "主厨每天采摘在地食材并用柴火窑炉烤制披萨 and 料理（Tabelog 百名店）。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/63b2a658931165bed9c4fcad", imageUrl: "https://scontent-nrt1-2.cdninstagram.com/v/t51.75761-15/491894174_18269332324273367_2710578025869041713_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=101&ig_cache_key=MzYyMjE3MDAzMTQ2OTUxODAwNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=hNYbzvj9J-IQ7kNvwFK4jfA&_nc_oc=Ado3T_Dvnp43Ikqa0aKO-2dqgxMcGfEGeLpIHZdRnSqtW_KK1c5AA6A-6x84OMvMG6KdPlIPhhDpA4Jtdefp8ore&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-nrt1-2.cdninstagram.com&_nc_gid=djgQOvGXsYYKd_M5MvPshQ&_nc_ss=7a22e&oh=00_Af0Mon9q6kPadW1V6VO9aXQzNYHJokhcTqC4MRFo3WyCpw&oe=69EFD4C6" }
    ]
  },
  {
    day: 7, date: "5/8", title: "岚山清幽与町屋内的超现实色彩",
    locations: [
      { 
        time: "09:30", name: "210 年古建的结构解剖学：パンとエスプレッソと嵐山庭園 (Bread, Espresso & 岚山庭园)", 
        description: "京都府指定文化财新生：这家店位于建于 210 年前的“旧小林家住宅”内，是一栋拥有巨大茅草屋顶（茅葺屋根）的传统古民家。走进去，你能清晰地看到头顶粗犷的黑色木质横梁与百年土墙。在这样一个充满历史厚重感的空间里，享用一份京都限定的“抹茶法式吐司”搭配精品手冲。一边吃早午餐，一边端详传统木造榫卯结构与现代商业动线的缝合，极具在地生活方式的张力。（注：这家非常火爆，建议早上 8点-9点去取号，或者作为漫步后的备选）。", 
        isKeyPlace: true,
        imageUrl: "https://bread-espresso.jp/common/img/shop/arashiyama-cafe_shop_02.jpg",
        casaLink: "https://casabrutus.com/categories/food/93798"
      },
      { 
        time: "11:30", name: "岚山 福田美术馆", description: "安田幸一设计，隔着玻璃长窗面对保津川和渡月桥享用简餐。", isKeyPlace: true,
        imageUrl: "https://fukuda-art-museum.jp/wp/wp-content/uploads/2020/11/og_image.jpg",
        casaLink: "https://casabrutus.com/search?q=福田美術館",
        audioLink: "https://www.xiaoyuzhoufm.com/episode/61823eb9ccefb250e38a2e58"
      },
      { time: "13:30", name: "誉田屋源兵卫", description: "近 300 年历史的带匠老铺，在“竹院の間”和“黑藏”欣赏前卫展览。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/661266ed13fe0a1d48ce4626", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/12/Heroes_del_Brillo_02-2048x1429.jpeg", imageLink: "https://www.kyotographie.jp/programs/2026/federico-estol/" },
      { time: "15:00", name: "有斐斋弘道馆", description: "江户时代的儒学道场遗址内的沉浸式光影展。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/661266ed13fe0a1d48ce4626", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/11/16-DSCF3248_RGB-4800-2048x1536.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/juliette-agnel/" },
      { time: "19:00", name: "岚山 𠮷村 (Arashiyama Yoshimura)", description: "吃一份极致的手打荞麦面。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/612a14e9f73111ba71edcfaf", imageUrl: "https://yoshimura-gr.com/arashiyama/images/top/top-main4.jpg", imageLink: "https://yoshimura-gr.com/arashiyama/" }
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
      { time: "13:30", name: "KYOTOGRAPHIE Photobook Fair", description: "在此淘独立摄影书并与世界各地的影像艺术家面对面交流。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/661266ed13fe0a1d48ce4626", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2026/03/KGbf_banner260312-A1.gif" },
      { time: "16:00", name: "ASPHODEL & ygion", description: "漫步祗园鸭川旁的当代多功能艺术空间看展。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/661266ed13fe0a1d48ce4626", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/11/08_SariShibata-2048x1536.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/sari-shibata/" },
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
      { time: "15:00", name: "重信会馆", description: "探访废弃遗迹摄影大师双人组的展览。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/661266ed13fe0a1d48ce4626", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2025/12/c803d74b-86ff-49a9-b633-3d83e9633402-Ruines-de-Paris-2024-4800-2048x1639.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/yves-marchand-romain-meffre/" },
      { time: "16:30", name: "出町桝形商店街 DELTA", description: "感受艺术与市井长屋商店街的完美融合。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/61e05a839e99c824c966468a", imageUrl: "https://www.kyotographie.jp/wp2025/wp-content/uploads/2026/03/Kyotographie-Thandiwe-Muriu-1-Current-Copy-1600x2400.jpg", imageLink: "https://www.kyotographie.jp/programs/2026/arp-thandiwe-muriu/" },
      { time: "18:30", name: "cenci", description: "米其林一星，平安神宫旁红砖餐厅内的意式料理创新。", isKeyPlace: true, audioLink: "https://www.xiaoyuzhoufm.com/episode/650b21dfb5c00e62057d1eb2", hideImage: true }
    ]
  },
  {
    day: 10, date: "5/11", title: "京都-北京\n14:20-16:55\n关西T1-首都T2 —— 缓慢的告别",
    titleLink: "https://a.feizhu.com/2ajWHj",
    locations: [
      { 
        time: "09:00", name: "鸭川", description: "早上在京都的町屋醒来，去鸭川边散个步。在附近的独立咖啡馆喝一杯手冲。", isKeyPlace: false,
        hideImage: true
      },
      { time: "14:00", name: "KIX 关西国际机场", description: "带着买到的摄影书和满满的看展记忆，前往机场飞回北京。", isKeyPlace: false, hideImage: true }
    ]
  }
];

const allCoverImages = itineraryData
  .flatMap(day => day.locations)
  .filter(loc => loc.imageUrl && !loc.hideImage)
  .map(loc => loc.imageUrl as string);

const DynamicCover = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allCoverImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#222]">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={allCoverImages[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.8, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
      </AnimatePresence>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none z-10">
         <h2 className="text-[#FAF9F7] text-4xl md:text-5xl lg:text-7xl font-serif tracking-tight mb-4 drop-shadow-xl saturate-0">Tokyo & Kyoto</h2>
         <p className="font-sans text-[#FAF9F7]/90 uppercase tracking-[0.3em] text-xs md:text-sm drop-shadow-md">Architecture & KYOTOGRAPHIE</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#222]/80 via-transparent to-[#222]/30 pointer-events-none" />
    </div>
  );
};

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
        <h2 className="text-3xl md:text-[2.75rem] lg:text-[3.25rem] font-serif mt-5 leading-[1.15] text-[#2c2a29] tracking-tight">
          {activeDayData.titleLink ? (
            <a href={activeDayData.titleLink} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-8 decoration-1 decoration-[#8C867A]/50 hover:text-black transition-all">
              {activeDayData.title.split(' —— ')[1] || activeDayData.title.split(' —— ')[0]}
            </a>
          ) : (
            activeDayData.title.split(' —— ')[1] || activeDayData.title.split(' —— ')[0]
          )}
        </h2>
        <p className="mt-6 lg:mt-8 font-serif text-base md:text-lg text-[#8C867A] leading-relaxed max-w-xl italic whitespace-pre-line">
          {activeDayData.titleLink ? (
            <a href={activeDayData.titleLink} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-1 decoration-[#8C867A]/50 hover:text-black transition-all">
              {activeDayData.title}
            </a>
          ) : (
            activeDayData.title
          )}
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
  const [openDay, setOpenDay] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  
  const activeDayData = openDay > 0 ? itineraryData.find(d => d.day === openDay) || itineraryData[0] : null;

  return (
    <div className="h-screen w-full bg-[#F2F0ED] text-[#333333] font-serif overflow-hidden flex flex-col relative">
      {/* Top Navigation Bar */}
      <header className="w-full py-2 pl-1 pr-6 md:px-12 border-b border-[#DCD9D4] shrink-0 bg-[#FAF9F7] relative z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full hover:bg-[#222]/5 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C867A]">
              <span>Spring 2026</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          {openDay === 0 ? (
            <motion.div 
              key="cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full absolute inset-0"
            >
              <DynamicCover />
            </motion.div>
          ) : (
            <motion.div 
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full overflow-y-auto p-6 md:p-12 lg:p-16 [&::-webkit-scrollbar]:hidden absolute inset-0 bg-white"
            >
              {activeDayData && <DayDetail activeDayData={activeDayData} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-[#222]/30 backdrop-blur-sm z-40"
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed top-0 left-0 bottom-0 w-fit max-w-[90vw] bg-[#FAF9F7] z-50 flex flex-col shadow-2xl border-r border-[#DCD9D4]"
            >
              <div className="p-4 md:p-6 border-b border-[#DCD9D4] bg-white sticky top-0 flex justify-between items-center gap-8 shrink-0">
                <div>
                  <h2 className="text-xl whitespace-nowrap">The Journey</h2>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-10 h-10 flex items-center justify-center bg-white border border-[#EBE8E4] rounded-full hover:bg-[#222] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto font-sans text-sm pb-12">
                <div 
                  onClick={() => {
                    setOpenDay(0);
                    setIsSidebarOpen(false);
                  }}
                  className={`p-5 md:p-6 border-b flex flex-col cursor-pointer transition-all duration-700 relative group overflow-hidden ${
                    openDay === 0 ? 'border-[#DCD9D4] bg-[#FAF9F7]' : 'border-[#EBE8E4] bg-white hover:bg-[#FAF9F7]'
                  }`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#222] transition-all duration-700 ease-[0.22,1,0.36,1] origin-top ${openDay === 0 ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 group-hover:scale-y-50 group-hover:opacity-20'}`} />
                  <span className={`transition-all duration-700 ease-[0.22,1,0.36,1] whitespace-nowrap ${openDay === 0 ? 'text-[#222] translate-x-2' : 'text-[#8C867A] group-hover:translate-x-1'}`}>
                    <span className="font-serif italic text-[15px] block uppercase tracking-widest">Home</span>
                  </span>
                </div>
                {itineraryData.map((dayData) => {
                  const isActive = openDay === dayData.day;
                  return (
                    <div 
                      key={dayData.day}
                      onClick={() => {
                        setOpenDay(dayData.day);
                        setIsSidebarOpen(false);
                      }}
                      className={`p-5 md:p-6 border-b flex flex-col sm:flex-row justify-between sm:items-center gap-8 cursor-pointer transition-all duration-700 relative group overflow-hidden ${
                        isActive 
                          ? 'border-[#DCD9D4] bg-[#FAF9F7]' 
                          : 'border-[#EBE8E4] bg-white hover:bg-[#FAF9F7]'
                      }`}
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#222] transition-all duration-700 ease-[0.22,1,0.36,1] origin-top ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 group-hover:scale-y-50 group-hover:opacity-20'}`} />
                      <span className={`transition-all duration-700 ease-[0.22,1,0.36,1] flex flex-col sm:flex-row sm:items-baseline ${isActive ? 'text-[#222] translate-x-2' : 'text-[#8C867A] group-hover:translate-x-1'}`}>
                        <span className="font-sans font-medium text-[10px] uppercase tracking-widest sm:w-16 shrink-0 mt-1 sm:mt-0">DAY {dayData.day.toString().padStart(2, '0')}</span> 
                        <span className="mt-1 sm:mt-0 font-serif italic text-[15px] whitespace-pre-line leading-snug">{dayData.title.split(' —— ')[0]}</span>
                      </span>
                      <span className={`font-mono text-[10px] mt-3 sm:mt-0 transition-all duration-700 ease-[0.22,1,0.36,1] whitespace-nowrap ${isActive ? 'opacity-100 text-[#222]' : 'opacity-40 text-[#8C867A]'}`}>{dayData.date}</span>
                    </div>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Status/Interactive Bar */}
      <footer className="w-full py-4 px-6 md:px-12 border-t border-[#DCD9D4] bg-[#FAF9F7] flex justify-between items-center shrink-0 z-20 relative">
        <div className="flex gap-6 font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C867A]">
          <span>
            {openDay === 0 ? "" : `Day ${openDay.toString().padStart(2, '0')}`}
          </span>
          <span className="hidden sm:inline">Syncing to Xiaoyuzhou</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block h-1 w-32 bg-[#EBE8E4] rounded-full overflow-hidden">
            <div className="h-full bg-[#8C867A] transition-all duration-500 delay-100" style={{ width: `${(openDay / 10) * 100}%` }}></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

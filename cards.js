const cartes = [
    {
        id: 1,
        nom: "Squirtle",
        description: "Pokémon Tortaruguina. Nº 0007. Altura: 0,5 m. Peso: 9,0 kg. Quando este Pokémon sente-se ameaçado, esconde-se dentro do seu casco e lança água pela boca.",
        img: "https://i.pinimg.com/736x/91/0f/1e/910f1e0d9615761e8a89099b729a19f8.jpg",
        categorie: "common",
        type: "creatures",
        favourite: false,
        pv: 60,
        element: "water",
        attaques: [
            {
                nom: "Retirada",
                cout: ["water"],
                degats: 0,
            },
            {
                nom: "Quebra-crânio",
                cout: ["water"],
                degats: 20,
            }
        ]
    },
    {
        id: 2,
        nom: "Pikachu",
        description: "Pokémon Rato. Nº 0025. Altura: 0,4 m. Peso: 6,0 kg. Quando está com raiva, descarrega imediatamente a energia armazenada nas bolsas em suas bochechas.",
        img: "https://i.pinimg.com/736x/bb/b6/2c/bbb62c9903cfee2efd5a2749b9712945.jpg",
        categorie: "common",
        type: "creatures",
        favourite: false,
        pv: 60,
        element: "electric",
        attaques: [
            {
                nom: "Carga",
                cout: ["electric"],
                degats: 30,
            },
            {
                nom: "Soco Pikachu",
                cout: ["electric", "colorless"],
                degats: 80,
            }
        ]
    },
    {
        id: 3,
        nom: "Charmeleon",
        description: "Flame Pokémon. NO. 0005. HT: 3'7\". WT: 41.9 lbs. If it becomes agitated during battle, it spouts intense flames, incinerating its surroundings.",
        img: "https://i.pinimg.com/1200x/24/76/31/2476310fa7a64535e5f2cf0965297fae.jpg",
        categorie: "common",
        type: "creatures",
        favourite: false,
        pv: 90,
        element: "fire",
        attaques: [
            {
                nom: "Heat Tackle",
                cout: ["fire"],
                degats: 70,
            }
        ]
    },
    {
        id: 4,
        nom: "Ptitard",
        description: "Pokémon Têtard. N° 0060. Taille : 0,6 m. Poids : 12,4 kg. Dans les rivières au courant puissant, il se ventouse pour s'accrocher aux rochers.",
        img: "https://i.pinimg.com/736x/50/15/0d/50150de8347864270d8097c31cc167a0.jpg",
        categorie: "common",
        type: "creatures",
        favourite: false,
        pv: 60,
        element: "water",
        attaques: [
            {
                nom: "Écume",
                cout: ["water"],
                degats: 10,
            }
        ]
    },
    {
        id: 5,
        nom: "Clefairy",
        description: "Pokémon Fada. N° 0035. Altura: 0,6 m. Peso: 7,5 kg. É muito popular devido ao seu gritinho e comportamento adoráveis. No entanto, este Pokémon fofinho raramente é encontrado.",
        img: "https://i.pinimg.com/736x/f0/d5/79/f0d5797c78924e5ea0a18e90a9a70037.jpg",
        categorie: "common",
        type: "creatures",
        favourite: false,
        pv: 60,
        element: "fairy",
        attaques: [
            {
                nom: "Convite Lunar",
                cout: ["fairy"],
                degats: 15,
            },
            {
                nom: "Estalo",
                cout: ["fairy", "colorless"],
                degats: 30,
            }
        ]
    },
    {
        id: 6,
        nom: "Mr. Mime",
        description: "Pokémon Barreira. Nº 0122. Altura: 1,3 m. Peso: 54,5 kg. Suas mãos talvez não sejam grandes por acaso: muitos cientistas acreditam que as palmas se alargaram para fazer mímica.",
        img: "https://i.pinimg.com/736x/71/7d/e4/717de407470701df213a8565c2bbf41e.jpg",
        categorie: "common",
        type: "creatures",
        favourite: false,
        pv: 90,
        element: "psychic",
        attaques: [
            {
                nom: "Show de Imitação",
                cout: ["colorless"],
                degats: 10,
            },
            {
                nom: "Onda Misteriosa",
                cout: ["psychic"],
                degats: 40,
            }
        ]
    },
    {
        id: 7,
        nom: "Mr. Mime",
        description: "Pokémon Barreira. Nº 0122. Altura: 1,3 m. Peso: 54,5 kg. Suas mãos talvez não sejam grandes por acaso: muitos cientistas acreditam que as palmas se alargaram para fazer mímica.",
        img: "https://i.pinimg.com/1200x/71/7d/e4/717de407470701df213a8565c2bbf41e.jpg",
        categorie: "common",
        type: "creatures",
        favourite: false,
        pv: 90,
        element: "psychic",
        attaques: [
            {
                nom: "Show de Imitação",
                cout: ["colorless"],
                degats: 20,
            },
            {
                nom: "Onda Misteriosa",
                cout: ["psychic"],
                degats: 20,
            }
        ]
    },
    {
        id: 8,
        nom: "Vulpix",
        description: "Pokémon Raposa. Nº 0037. Altura: 0,6 m. Peso: 9,9 kg. Conforme vai crescendo, suas seis caudas centinhas tornam-se mais belas, com uma pelugem ainda mais luxuosa.",
        img: "https://i.pinimg.com/736x/5a/d3/e1/5ad3e18494c96cf9ccbb3c04c94c67ed.jpg",
        categorie: "common",
        type: "creatures",
        favourite: false,
        pv: 70,
        element: "fire",
        attaques: [
            {
                nom: "Desmantelar",
                cout: ["fire"],
                degats: 30,
            }
        ]
    },
    {
        id: 9,
        nom: "Cubone",
        description: "Pokémon Solitario. N° 0104. Altura: 0,4 m. Peso: 6,5 kg. Siempre lleva la calavera de su madre como casco, por lo que nadie ha visto nunca su verdadera cara.",
        img: "https://i.pinimg.com/1200x/d7/97/d7/d797d7be832df0ca5f53789aa5b18b8c.jpg",
        categorie: "common",
        type: "creatures",
        favourite: false,
        pv: 60,
        element: "fighting",
        attaques: [
            {
                nom: "Huesomerang",
                cout: ["fighting"],
                degats: 40,
            }
        ]
    },
    {
        id: 10,
        nom: "Meowth",
        description: "Pokémon Arranha Gato. Nº 0052. Altura: 0,4 m. Peso: 4,2 kg. Ama coisas reluzentes. Quando vê um objeto brilhante, a moeda dourada na sua cabeça brilha também.",
        img: "https://i.pinimg.com/736x/08/f0/a2/08f0a2f1198f1b7b7906ee31d582e3a2.jpg",
        categorie: "common",
        type: "creatures",
        favourite: false,
        pv: 70,
        element: "colorless",
        attaques: [
            {
                nom: "Golpes de Fúria",
                cout: ["colorless"],
                degats: 60,
            }
        ]
    },
    {
        id: 11,
        nom: "Meowth V",
        description: "Carte Promo (SWSH004). Règle V : Lorsque votre Pokémon V est mis K.O., votre adversaire prend 2 cartes Récompense. Illustrateur : aky CG Works.",
        img: "https://i.pinimg.com/1200x/b1/9e/6a/b19e6a61ea62e686cb04aa9a0e37934a.jpg",
        categorie: "rare",
        type: "creatures",
        favourite: false,
        pv: 180,
        element: "colorless",
        attaques: [
            {
                nom: "Pay Day",
                cout: ["colorless"],
                degats: 60,
            },
            {
                nom: "Slashing Claw",
                cout: ["colorless"],
                degats: 130,
            }
        ]
    },
    {
        id: 12,
        nom: "Exeggutor ex",
        description: "Carte Pokémon ex (Stage 1, évolue d'Exeggcute). Règle ex : Lorsque votre Pokémon ex est mis K.O., votre adversaire gagne 2 points. Illustrateur : PLANETA CG Works.",
        img: "https://i.pinimg.com/736x/1a/ee/d7/1aeed7115d6b0693645549e97ff08141.jpg",
        categorie: "rare",
        type: "creatures",
        favourite: false,
        pv: 160,
        element: "grass",
        attaques: [
            {
                nom: "Tropical Swing",
                cout: ["grass"],
                degats: 100,
            }
        ]
    },
    {
        id: 13,
        nom: "Umbreon V",
        description: "Carte Pokémon V (Single Strike). Règle V : Lorsque votre Pokémon V est mis K.O., votre adversaire prend 2 cartes Récompense. Illustrateur : Skan Graphics.",
        img: "https://i.pinimg.com/736x/ee/9f/1e/ee9f1e5e3d28785cc6dde514ee049ff4.jpg",
        categorie: "rare",
        type: "creatures",
        favourite: false,
        pv: 200,
        element: "darkness",
        attaques: [
            {
                nom: "Mean Look",
                cout: ["darkness"],
                degats: 30,
            },
            {
                nom: "Moonlight Blade",
                cout: ["darkness", "colorless"],
                degats: 160,
            }
        ]
    },
    {
        id: 14,
        nom: "Jolteon V",
        description: "Carte Promo (SWSH151). Règle V : Lorsque votre Pokémon V est mis K.O., votre adversaire prend 2 cartes Récompense. Illustrateur : Skan Graphics.",
        img: "https://i.pinimg.com/736x/89/68/ee/8968eeab92d36c30e36f55f3a71db514.jpg",
        categorie: "rare",
        type: "creatures",
        favourite: false,
        pv: 190,
        element: "electric",
        attaques: [
            {
                nom: "Thunder Spear",
                cout: ["colorless"],
                degats: 30,
            },
            {
                nom: "Pin Missile",
                cout: ["electric", "colorless"],
                degats: 200,
            }
        ]
    },
    {
        id: 15,
        nom: "Leafeon V",
        description: "Carte Pokémon V (Evolving Skies, 166/203). Règle V : Lorsque votre Pokémon V est mis K.O., votre adversaire prend 2 cartes Récompense. Illustrateur : Skan Graphics.",
        img: "https://i.pinimg.com/736x/dc/f8/34/dcf834e1fe2a8e13e3c52a859e3a9bc8.jpg",
        categorie: "rare",
        type: "creatures",
        favourite: false,
        pv: 200,
        element: "grass",
        attaques: [
            {
                nom: "Leaf Blade",
                cout: ["grass", "colorless", "colorless"],
                degats: 200,
            }
        ]
    },
    {
        id: 16,
        nom: "Corviknight V",
        description: "Carte Pokémon V (Evolving Skies, 156/163). Règle V : Lorsque votre Pokémon V est mis K.O., votre adversaire prend 2 cartes Récompense. Illustrateur : PLANETA Mochizuki.",
        img: "https://i.pinimg.com/1200x/ef/ef/4e/efef4ecb26d5d711f2cf2984b8440ca8.jpg",
        categorie: "rare",
        type: "creatures",
        favourite: false,
        pv: 210,
        element: "metal",
        attaques: [
            {
                nom: "Clutch",
                cout: ["metal"],
                degats: 30,
            },
            {
                nom: "Sky Hurricane",
                cout: ["metal", "colorless"],
                degats: 190,
            }
        ]
    },
    {
        id: 17,
        nom: "Mewtwo ex",
        description: "Carte Pokémon ex (Basic, illustration gold/rainbow). Règle ex : Lorsque votre Pokémon ex est mis K.O., votre adversaire gagne 2 points. Illustrateur : 5ban Graphics.",
        img: "https://i.pinimg.com/736x/62/a7/61/62a761cc6dfa5eef83d7b0b654076c7c.jpg",
        categorie: "rare",
        type: "creatures",
        favourite: false,
        pv: 150,
        element: "psychic",
        attaques: [
            {
                nom: "Psychic Sphere",
                cout: ["psychic", "colorless"],
                degats: 50,
                effet: ""
            },
            {
                nom: "Psydrive",
                cout: ["psychic", "psychic", "colorless", "colorless"],
                degats: 150,
                effet: "Défaussez 2 Énergies Psychic de ce Pokémon."
            }
        ]
    },
    {
        id: 18,
        nom: "Charizard ex",
        description: "Carte Pokémon ex (Stage 2, évolue de Charmeleon). Règle ex : Lorsque votre Pokémon ex est mis K.O., votre adversaire gagne 2 points. Illustrateur : PLANETA Igarashi.",
        img: "https://i.pinimg.com/736x/e3/13/12/e3131266ff9afa0af8c387947f23aa53.jpg",
        categorie: "rare",
        type: "creatures",
        favourite: false,
        pv: 180,
        element: "fire",
        attaques: [
            {
                nom: "Stoke",
                cout: ["fire"],
                degats: 35,
            },
            {
                nom: "Steam Artillery",
                cout: ["fire", "colorless"],
                degats: 160,
            }
        ]
    },
    {
        id: 19,
        nom: "Gengar ex",
        description: "Carte Pokémon ex (Stage 2, évolue de Haunter). Règle ex : Lorsque votre Pokémon ex est mis K.O., votre adversaire gagne 2 points. Illustrateur : PLANETA CG Works.",
        img: "https://i.pinimg.com/736x/3f/c0/5c/3fc05c68716e22b6b32a9d8da22d3cf6.jpg",
        categorie: "rare",
        type: "creatures",
        favourite: false,
        pv: 170,
        element: "psychic",
        attaques: [
            {
                nom: "Spooky Shot",
                cout: ["psychic", "psychic", "psychic"],
                degats: 110,
            }
        ]
    },
    {
        id: 20,
        nom: "Mimikyu ex",
        description: "Carte Pokémon ex (Basic, 069/159). Règle ex : Lorsque votre Pokémon ex est mis K.O., votre adversaire prend 2 cartes Récompense. Illustrateur : PLANETA Igarashi.",
        img: "https://i.pinimg.com/736x/d0/54/12/d05412f113bb7adccd95ed420eb52f42.jpg",
        categorie: "rare",
        type: "creatures",
        favourite: false,
        pv: 190,
        element: "psychic",
        attaques: [
            {
                nom: "Miscchievous Hands",
                cout: ["psychic", "colorless"],
                degats: 0,
            },
            {
                nom: "Ghostly Trip",
                cout: ["psychic", "colorless"],
                degats: 120,
            }
        ]
    },
    {
        id: 21,
        nom: "Gengar ex",
        description: "Carte Pokémon ex (Stage 2, évolue de Haunter, 01/354). Règle ex : Lorsque votre Pokémon ex est mis K.O., votre adversaire prend 2 cartes Récompense.",
        img: "https://i.pinimg.com/736x/56/ff/da/56ffdad36604984860c4a2c95885c745.jpg",
        categorie: "epic",
        type: "hero",
        favourite: false,
        pv: 320,
        element: "psychic",
        attaques: [
            {
                nom: "Dream Eater",
                cout: ["psychic", "colorless"],
                degats: 150,
            },
            {
                nom: "Shadow Ball",
                cout: ["psychic"],
                degats: 80,
            }
        ],
    },
    {
        id: 22,
        nom: "Mega Charizard X ex",
        description: "Carte Pokémon ex (Stage 2, évolue de Charmeleon, 125/094). Méga-Évolution de Charizard. Règle Méga Évolution ex : Lorsque votre Pokémon Méga Évolution ex est mis K.O., votre adversaire prend 3 cartes Récompense. Illustrateur : danciao.",
        img: "https://i.pinimg.com/736x/35/1f/c5/351fc51d72cd1b4528c95125d1b90ea1.jpg",
        categorie: "epic",
        type: "hero",
        favourite: false,
        pv: 360,
        element: "fire",
        attaques: [
            {
                nom: "Inferno X",
                cout: ["fire"],
                degats: 300,
            }
        ]
    },
    {
        id: 23,
        nom: "Charizard ex",
        description: "Carte Pokémon ex Tera (Stage 2, évolue de Charmeleon, 234/091). Tera : tant que ce Pokémon est sur votre Banc, prévenez tous les dégâts qui lui sont infligés par les attaques (les vôtres comme celles de votre adversaire). Règle ex : Lorsque votre Pokémon ex est mis K.O., votre adversaire prend 2 cartes Récompense. Illustrateur : AKIRA EGAWA.",
        img: "https://i.pinimg.com/736x/8e/33/64/8e33649ad42dd8ad2774a5d324de9310.jpg",
        categorie: "epic",
        type: "hero",
        favourite: false,
        pv: 330,
        element: "darkness",
        attaques: [
            {
                nom: "Burning Darkness",
                cout: ["fire", "fire"],
                degats: 180,
            }
        ],
    },
    {
        id: 24,
        nom: "Mega Dragonite ex",
        description: "Carte Pokémon ex (Stage 2, évolue de Dragonair, 231/217). Méga-Évolution de Dragonite. Règle Méga Évolution ex : Lorsque votre Pokémon Méga Évolution ex est mis K.O., votre adversaire prend 3 cartes Récompense. Illustrateur : DOM.",
        img: "https://i.pinimg.com/736x/87/2f/78/872f78eab5cc319022cbd2f61a03323e.jpg",
        categorie: "epic",
        type: "hero",
        favourite: false,
        pv: 370,
        element: "colorless",
        attaques: [
            {
                nom: "Ryuno Glide",
                cout: ["water", "water", "colorless"],
                degats: 330,
            }
        ],
    },
    {
        id: 25,
        nom: "Mega Froslass ex",
        description: "Carte Pokémon ex (Stage 1, évolue de Snorunt, 265/217). Méga-Évolution de Froslass. Règle Méga Évolution ex : Lorsque votre Pokémon Méga Évolution ex est mis K.O., votre adversaire prend 3 cartes Récompense. Illustrateur : Saboteri.",
        img: "https://i.pinimg.com/736x/e0/9e/db/e09edb56a3e5801e54cb95250f136ca0.jpg",
        categorie: "epic",
        type: "hero",
        favourite: false,
        pv: 310,
        element: "water",
        attaques: [
            {
                nom: "Resentful Refrain",
                cout: ["water"],
                degats: 300,
            },
            {
                nom: "Absolute Snow",
                cout: ["water", "colorless"],
                degats: 150,
            }
        ]
    },
    {
        id: 26,
        nom: "Tyranitar ex",
        description: "Carte Pokémon ex Téracristal (Niveau 2, évolution de Ymphect, 211/197). Téracristal : tant que ce Pokémon est sur votre Banc, évitez tous les dégâts infligés à ce Pokémon par des attaques (les vôtres et celles de votre adversaire). Règle ex : Lorsque votre Pokémon ex est mis K.O., l'adversaire récupère 2 cartes Récompense. Illustrateur : 5ban Graphics.",
        img: "https://i.pinimg.com/736x/3f/cf/37/3fcf376e1e016c8dee1c8d3dfbcb2465.jpg",
        categorie: "epic",
        type: "hero",
        favourite: false,
        pv: 340,
        element: "electric",
        attaques: [
            {
                nom: "Lance-Montagnes",
                cout: ["fighting"],
                degats: 120,
            },
            {
                nom: "Saccage Électrique",
                cout: ["fighting"],
                degats: 160,
            }
        ]
    },
    {
        id: 27,
        nom: "Charizard ex",
        description: "Carte Pokémon ex Tera (Stage 2, évolue de Charmeleon, 215/197). Tera : tant que ce Pokémon est sur votre Banc, prévenez tous les dégâts qui lui sont infligés par les attaques (les vôtres comme celles de votre adversaire). Règle ex : Lorsque votre Pokémon ex est mis K.O., votre adversaire prend 2 cartes Récompense. Illustrateur : 5ban Graphics.",
        img: "https://i.pinimg.com/736x/9d/36/ce/9d36ce48391730e3a277a94650c31c05.jpg",
        categorie: "epic",
        type: "hero",
        favourite: false,
        pv: 330,
        element: "fire",
        attaques: [
            {
                nom: "Burning Darkness",
                cout: ["fire"],
                degats: 250,
            }
        ],
    },
    {
        id: 28,
        nom: "Mega Lucario ex",
        description: "Carte Pokémon ex (1 évolution, évolue de Riolu, 228/193). Méga-Évolution de Lucario. Règle Méga Évolution ex : Lorsque votre Pokémon Méga Évolution ex est mis K.O., votre adversaire prend 3 cartes Récompense. Illustrateur : 5ban Graphics.",
        img: "https://i.pinimg.com/736x/36/4d/f2/364df26e79aa7b0ad1baef58f4826007.jpg",
        categorie: "epic",
        type: "hero",
        favourite: false,
        pv: 340,
        element: "fighting",
        attaques: [
            {
                nom: "Hadou Burst",
                cout: ["fighting"],
                degats: 130,
            },
            {
                nom: "Mega Brave",
                cout: ["fighting"],
                degats: 270,
            }
        ]
    },
    {
        id: 29,
        nom: "Mega Pyroar ex",
        description: "Carte Pokémon ex japonaise (1 évolution, évolue de Litleo, 015/083 RR). Méga-Évolution de Pyroar. Règle Méga Évolution ex : Lorsque votre Pokémon Méga Évolution ex est mis K.O., votre adversaire prend 3 cartes Récompense. Illustrateur : Keisuke Azuma.",
        img: "https://i.pinimg.com/1200x/0f/2e/b0/0f2eb053223b5a09a4acc13a86951ec2.jpg",
        categorie: "epic",
        type: "hero",
        favourite: false,
        pv: 340,
        element: "fire",
        attaques: [
            {
                nom: "Roar / Howl",
                cout: ["fire", "colorless"],
                degats: 80,
            },
            {
                nom: "Big Bang Fire",
                cout: ["fire", "colorless"],
                degats: 300,
            }
        ]
    },
    {
        id: 30,
        nom: "Blastoise VMAX",
        description: "Carte Pokémon VMAX (évolue de Blastoise V, forme Gigantamax). Règle VMAX : Lorsque votre Pokémon VMAX est mis K.O., votre adversaire prend 3 cartes Récompense. Illustrateur : rushfortacos.",
        img: "https://i.pinimg.com/736x/cc/65/fd/cc65fda42c67421efa9f66956a60b2fd.jpg",
        categorie: "epic",
        type: "serviteur",
        favourite: false,
        pv: 350,
        element: "water",
        attaques: [
            {
                nom: "G-Max Geyser",
                cout: ["water"],
                degats: 200,
            }
        ]
    },
    {
        id: 31,
        nom: "Dark Charizard VMAX",
        description: "Carte Pokémon VMAX (custom / fan-made, évolue de Charizard, forme Gigantamax). Règle VMAX : Lorsque votre Pokémon VMAX est mis K.O., votre adversaire prend 3 cartes Récompense. Illustrateur : Amogh the great.",
        img: "https://i.pinimg.com/1200x/2e/c9/28/2ec92880a9cfca5d4343e023ce3f3ec7.jpg",
        categorie: "legend",
        type: "serviteur",
        favourite: false,
        pv: 500,
        element: "darkness",
        attaques: [
            {
                nom: "Darkness Cover",
                cout: ["fire", "fighting", "darkness"],
                degats: 500,
                effet: "Défaussez 3 Énergies de cette carte."
            },
            {
                nom: "Soul",
                cout: ["fire", "darkness"],
                degats: 250,
                effet: "L'âme du Pokémon est piégée."
            }
        ],
    },
    {
        id: 32,
        nom: "Mewtwo VMAX",
        description: "Carte Pokémon VMAX (custom / fan-made, évolue de MEW, forme Gigantamax). Règle VMAX : Lorsque votre Pokémon VMAX est mis K.O., votre adversaire prend 3 cartes Récompense.",
        img: "https://i.pinimg.com/1200x/17/8c/c7/178cc79e5e2da9ebe4d84989f274aa4e.jpg",
        categorie: "legend",
        type: "serviteur",
        favourite: false,
        pv: 760,
        element: "darkness",
        attaques: [
            {
                nom: "KO-",
                cout: ["colorless"],
                degats: 750,
            },
            {
                nom: "Dark Strik",
                cout: ["darkness", "darkness"],
                degats: 500,
            }
        ],
    },
    {
        id: 33,
        nom: "Primal Groudon EX",
        description: "Carte Pokémon EX (custom / fake, évolue de Primal Groudon, 159/300). Règle EX : Lorsque votre Pokémon EX est mis K.O., votre adversaire prend 2 cartes Récompense. Règle Méga Évolution : lorsqu'un de vos Pokémon devient un Pokémon Méga Évolution, votre tour se termine. Illustrateur : ???.",
        img: "https://i.pinimg.com/736x/d1/be/80/d1be8073b5b1fc0a336be919ac292b3e.jpg",
        categorie: "legend",
        type: "serviteur",
        favourite: false,
        pv: 750,
        element: "fighting",
        attaques: [
            {
                nom: "Continental Quake",
                cout: ["fighting"],
                degats: 450,
            },
            {
                nom: "Volcanic Explosion",
                cout: ["fire"],
                degats: 320,
            }
        ],
    },
    {
        id: 35,
        nom: "M Gyarados VMAX",
        description: "Carte Pokémon VMAX (custom / fan-made, évolue de Gyarados, forme Gigantamax). Règle VMAX : Lorsque votre Pokémon VMAX est mis K.O., votre adversaire prend 3 cartes Récompense. Illustrateur : aschefield.",
        img: "https://i.pinimg.com/736x/7e/d1/03/7ed1038bd2a1676f26ccd8b23c9736b4.jpg",
        categorie: "legend",
        type: "serviteur",
        favourite: false,
        pv: 600,
        element: "water",
        attaques: [
            {
                nom: "Watercanon",
                cout: ["water", "fighting", "fighting", "fighting"],
                degats: "540+",
            },
            {
                nom: "Water jet",
                cout: ["water", "water", "fighting", "fighting"],
                degats: "780+",
            }
        ]
    },
    {
        id: 36,
        nom: "Reshiram V",
        description: "Carte Pokémon V (custom / fan-made, 09/2005). Règle V : Lorsque votre Pokémon V est mis K.O., votre adversaire prend 2 cartes Récompense. Illustrateur : Quentin Boichut.",
        img: "https://i.pinimg.com/1200x/66/40/38/664038a4cbfafec9e6c5e6be301a6498.jpg",
        categorie: "legend",
        type: "serviteur",
        favourite: false,
        pv: 570,
        element: "fire",
        attaques: [
            {
                nom: "Cross Flame",
                cout: ["fire", "colorless"],
                degats: 610,
            },
            {
                nom: "Blue Flare",
                cout: ["fire", "colorless"],
                degats: 540,
            },
            {
                nom: "Draco-Reality",
                cout: ["fire", "colorless"],
                degats: 640,
            }
        ],
    },
    {
        id: 37,
        nom: "Xerneas GX",
        description: "Carte Pokémon GX (custom / fan-made, 09/2005). Règle GX : Lorsque votre Pokémon GX est mis K.O., votre adversaire prend 2 cartes Récompense. Illustrateur : Quentin BOICHUT.",
        img: "https://i.pinimg.com/1200x/f7/7f/8c/f77f8c790aa5b168eb1a57f28e63c4e8.jpg",
        categorie: "legend",
        type: "serviteur",
        favourite: false,
        pv: 640,
        element: "fairy",
        attaques: [
            {
                nom: "Girdwood X",
                cout: ["grass", "fairy"],
                degats: 460,
            },
            {
                nom: "Geo-Control GX",
                cout: ["fairy"],
                degats: 500,
            }
        ],

    },
    {
        id: 38,
        nom: "Rayquaza Shiny VMAX",
        description: "Carte Pokémon VMAX (custom / fan-made, 001/100, forme Dynamax). Règle VMAX : Lorsque votre Pokémon VMAX est mis K.O., votre adversaire prend 3 cartes Récompense. Illustrateur : Your Name.",
        img: "https://i.pinimg.com/736x/2b/84/92/2b8492929878c8283693556e3d9b668c.jpg",
        categorie: "legend",
        type: "sort",
        favourite: false,
        pv: 999,
        element: "colorless",
        attaques: [
            {
                nom: "Dragons",
                cout: ["dragon"],
                degats: 680,
            },
            {
                nom: "Poderes",
                cout: ["dragon", "fighting", "fire", "dragon"],
                degats: 300
            }
        ]
    },
    {
        id: 39,
        nom: "Corruption, God of Destruction VMAX",
        description: "Carte Pokémon VMAX (custom / fan-made, « Fractal 2.0 », forme Gigantamax). Règle VMAX : Lorsque votre Pokémon VMAX est mis K.O., votre adversaire prend 3 cartes Récompense. Illustrateur : aschefield.",
        img: "https://i.pinimg.com/1200x/65/4f/65/654f6580e9a8244114c7cfcb591ba55e.jpg",
        categorie: "legend",
        type: "sort",
        favourite: false,
        pv: 9000,
        element: "darkness",
        attaques: [
            {
                nom: "Infinite beam of Rager destruction",
                cout: ["psychic", "psychic", "fire", "colorless", "colorless"],
                degats: 999,
            }
        ],
    },
    {
        id: 40,
        nom: "Solgaleo V",
        description: "Carte Pokémon V (custom / fan-made). Règle V : Lorsque votre Pokémon V est mis K.O., votre adversaire prend 2 cartes Récompense. Illustrateur : aschefield.",
        img: "https://i.pinimg.com/736x/60/5e/02/605e02a79af04313b45898bade496cc5.jpg",
        categorie: "legend",
        type: "sort",
        favourite: false,
        pv: 999,
        element: "psychic",
        attaques: [
            {
                nom: "ToqueAssombroso",
                cout: ["psychic"],
                degats: 111,
            },
            {
                nom: "GigaEmpacto",
                cout: ["psychic", "colorless"],
                degats: 222,
            }
        ]
    }


];
var voorbeeldQuiz = {
	titel: 'De slimste ket ter wereld',
	drieZesNegen: {
		vraag2: {
			vraag: 'Dit is een vraag ...',
			antwoord: 'Dit is een antwoord ...',
			link: 'quizzen/voorbeeldquiz/driezesnegen/Winnie.jpg'
		},
		vraag4: {
			vraag: 'Dit is een vraag ...',
			antwoord: 'Dit is een antwoord ...',
			link: 'quizzen/voorbeeldquiz/driezesnegen/tijgetje.jpg'
		}
	},
	galerijen: [
			{baseUrl:'quizzen/voorbeeldquiz/galerij/pooh/',
			 fotos: [{url: 'Winnie.jpg', verticaleFoto: true}, {url: 'tijgetje.jpg'}, {url: 'ioor.jpg'},
			 		 {url: 'Winnie.jpg', verticaleFoto: true}, {url: 'tijgetje.jpg'}, {url: 'ioor.jpg'},
			 		 {url: 'Winnie.jpg', verticaleFoto: true}, {url: 'tijgetje.jpg'}, {url: 'ioor.jpg'},
			 		 {url: 'Winnie.jpg', verticaleFoto: true} ],
			 link: 'quizzen/voorbeeldquiz/galerij/pooh/Winnie.jpg' },
			{baseUrl:'quizzen/voorbeeldquiz/galerij/pooh/',
			 fotos: [{url: 'Winnie.jpg'} ] },
			{baseUrl:'quizzen/voorbeeldquiz/galerij/pooh/',
			 fotos: [{url: 'Winnie.jpg'} ] },
			{baseUrl:'quizzen/voorbeeldquiz/galerij/pooh/',
			 fotos: [{url: 'Winnie.jpg'} ] },
			{baseUrl:'quizzen/voorbeeldquiz/galerij/pooh/',
			 fotos: [{url: 'Winnie.jpg'} ] },
			{baseUrl:'quizzen/voorbeeldquiz/galerij/pooh/',
			 fotos: [{url: 'Winnie.jpg'} ] },
			{baseUrl:'quizzen/voorbeeldquiz/galerij/pooh/',
			 fotos: [{url: 'Winnie.jpg'} ] },
			{baseUrl:'quizzen/voorbeeldquiz/galerij/pooh/',
			 fotos: [{url: 'Winnie.jpg'} ] }
			],
	opendeur: {
		vragen: [
		{naam: 'Omschrijving 1', urlFoto:'quizzen/voorbeeldquiz/opendeur/something.jpg', urlFilm: 'quizzen/voorbeeldquiz/opendeur/Lazy_dog.mp4', 
		 antwoorden: ['Antwoord 1', 'Antwoord 2', 'Antwoord 3', 'Antwoord 4'],
		 link: 'quizzen/voorbeeldquiz/opendeur/something.jpg'},
		{naam: 'Omschrijving 2', urlFoto:'quizzen/voorbeeldquiz/opendeur/something2.jpg', urlFilm: 'quizzen/voorbeeldquiz/opendeur/Lazy_dog.mp4', 
		 antwoorden: ['Antwoord 1', 'Antwoord 2', 'Antwoord 3', 'Antwoord 4']},
		{naam: 'Omschrijving 3', urlFoto:'quizzen/voorbeeldquiz/opendeur/something3.jpg', urlFilm: 'quizzen/voorbeeldquiz/opendeur/Lazy_dog.mp4', 
		 antwoorden: ['Antwoord 1', 'Antwoord 2', 'Antwoord 3', 'Antwoord 4']}
		 ]
	},
	puzzels: [
		{ antwoorden: [
			{antwoord: 'Antwoord 1', hints: ['Hint 1 voor 1', 'Hint 2 voor 1', 'Hint 3 voor 1', 'Hint 4 voor 1']},
			{antwoord: 'Antwoord 2', hints: ['Hint 1 voor 2', 'Hint 2 voor 2', 'Hint 3 voor 2', 'Hint 4 voor 2']},
			{antwoord: 'Antwoord 3', hints: ['Hint 1 voor 3', 'Hint 2 voor 3', 'Hint 3 voor 3', 'Hint 4 voor 3']}
		]},
		{ antwoorden: [
			{antwoord: 'Antwoord 1', hints: ['Hint 1 voor 1', 'Hint 2 voor 1', 'Hint 3 voor 1', 'Hint 4 voor 1']},
			{antwoord: 'Antwoord 2', hints: ['Hint 1 voor 2', 'Hint 2 voor 2', 'Hint 3 voor 2', 'Hint 4 voor 2']},
			{antwoord: 'Antwoord 3', hints: ['Hint 1 voor 3', 'Hint 2 voor 3', 'Hint 3 voor 3', 'Hint 4 voor 3']}
		]},
		{ antwoorden: [
			{antwoord: 'Antwoord 1', hints: ['Hint 1 voor 1', 'Hint 2 voor 1', 'Hint 3 voor 1', 'Hint 4 voor 1']},
			{antwoord: 'Antwoord 2', hints: ['Hint 1 voor 2', 'Hint 2 voor 2', 'Hint 3 voor 2', 'Hint 4 voor 2']},
			{antwoord: 'Antwoord 3', hints: ['Hint 1 voor 3', 'Hint 2 voor 3', 'Hint 3 voor 3', 'Hint 4 voor 3']}
		]}
	],
	collectiefGeheugen: {
		videos: [
			{urlVideo: 'quizzen/voorbeeldquiz/collectiefgeheugen/Lazy_dog.mp4', antwoorden: ['Frankrijk', 'Seine', 'Louvre', 'Sacr� coeur', 'eenAntwoord'] },
			{urlVideo: 'quizzen/voorbeeldquiz/collectiefgeheugen/Lazy_dog.mp4', antwoorden: ['blabla', 'boemboem', 'nana', 'sasa', 'gaga'] }
		],
	},
	finale: [
		{ vraag: 'Wat weet je over Parijs?',
		  antwoorden: ['Frankrijk', 'Seine', 'Louvre', 'Sacr� coeur', 'lichtstad'] },
		{ vraag: 'Wat weet je over Blablabla?',
		  antwoorden: ['Niks', 'Minder', 'Nog minder', 'Helemaal niks', 'Boem boem'] }
	]
};

slimsteQuizzen.registerQuiz(voorbeeldQuiz);

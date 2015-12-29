var voorbeeldQuiz = {
	titel: 'De slimste ket ter wereld',
	drieZesNegen: {
		vraag2: {
			vraag: 'Dit is een vraag ...',
			antwoord: 'Dit is een antwoord ...',
			link: 'images/pooh/Winnie.jpg'
		},
		vraag4: {
			vraag: 'Dit is een vraag ...',
			antwoord: 'Dit is een antwoord ...',
			link: 'images/pooh/tijgetje.jpg'
		}
	},
	galerijen: [
			{baseUrl:'images/pooh/',
			 fotos: [{url: 'Winnie.jpg'}, {url: 'tijgetje.jpg'}, {url: 'ioor.jpg'} ]}
			],
	vragenOpenDeurRonde: [
		{naam: 'Omschrijving 1', urlFoto:'openDeur/something.jpg', urlFilm: 'videos/Lazy_dog.mp4', 
		 antwoorden: ['Antwoord 1', 'Antwoord 2', 'Antwoord 3', 'Antwoord 4']},
		{naam: 'Omschrijving 2', urlFoto:'openDeur/something2.jpg', urlFilm: 'videos/Lazy_dog.mp4', 
		 antwoorden: ['Antwoord 1', 'Antwoord 2', 'Antwoord 3', 'Antwoord 4']},
		{naam: 'Omschrijving 3', urlFoto:'openDeur/something3.jpg', urlFilm: 'videos/Lazy_dog.mp4', 
		 antwoorden: ['Antwoord 1', 'Antwoord 2', 'Antwoord 3', 'Antwoord 4']}
		 ],
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
			{urlVideo: 'videos/Lazy_dog.mp4', antwoorden: ['Frankrijk', 'Seine', 'Louvre', 'Sacré coeur', 'eenAntwoord'] },
			{urlVideo: 'videos/Lazy_dog.mp4', antwoorden: ['blabla', 'boemboem', 'nana', 'sasa', 'gaga'] }
		],
	},
	finale: [
		{ vraag: 'Wat weet je over Parijs?',
		  antwoorden: ['Frankrijk', 'Seine', 'Louvre', 'Sacré coeur', 'lichtstad'] },
		{ vraag: 'Wat weet je over Blablabla?',
		  antwoorden: ['Niks', 'Minder', 'Nog minder', 'Helemaal niks', 'Boem boem'] }
	]

};

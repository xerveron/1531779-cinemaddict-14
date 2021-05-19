
import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));

    return Math.floor(lower + Math.random() * (upper - lower + 1));
};


const generateDate = (type) => {
    if (type === 'created') {
        const maxDaysGap = 7300;
        const daysGap = getRandomInteger(-maxDaysGap,-30);

        return dayjs().add(daysGap, 'day').toDate();
    } else {
        const isDate = Boolean(getRandomInteger(0, 1));

        if (!isDate) {
            return null;
        }
        const maxDaysGap = 30;
        const daysGap = getRandomInteger(-maxDaysGap,0);

        return dayjs().add(daysGap, 'day').toDate();
    }
};

const generateDescription = () => {
    const descriptionPart = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        'Cras aliquet varius magna, non porta ligula feugiat eget. ',
        'Fusce tristique felis at fermentum pharetra. ',
        'Aliquam id orci ut lectus varius viverra. ',
        'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
        'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
        'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
        'Sed sed nisi sed augue convallis suscipit in sed felis. ',
        'Aliquam erat volutpat. ',
        'Nunc fermentum tortor ac porta dapibus. ',
        'In rutrum ac purus sit amet tempus.',
    ];

    let description = '';

    for (let i = 0; i < 5; i++) {
        if (getRandomInteger(0, 1)) {
            description += descriptionPart[getRandomInteger(0, descriptionPart.length - 1)];
        }
    }

    return description;
}

const generateTitle = () => {
    const titles = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        'Cras aliquet varius magna, non porta ligula feugiat eget. ',
        'Fusce tristique felis at fermentum pharetra. ',
        'Aliquam id orci ut lectus varius viverra. ',
        'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
        'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
        'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
        'Sed sed nisi sed augue convallis suscipit in sed felis. ',
        'Aliquam erat volutpat. ',
        'Nunc fermentum tortor ac porta dapibus. ',
        'In rutrum ac purus sit amet tempus.',
    ];

    const randomIndex = getRandomInteger(0, titles.length - 1);

    return titles[randomIndex];
}

const generateCountry = () => {
    const countrys = [
        'Finland',
        'Russia',
        'USA',
        'Germany',
        'The Great Britain',
        'France',
        'Japan',
        'Turkey',
        'OAE',
        'Poland',
        'Ukraine',
    ];

    const randomIndex = getRandomInteger(0, countrys.length - 1);

    return countrys[randomIndex];
}

const generatePeople = () => {
    const peoplePart = [
        'Tom Ford',
        'Takeshi Kitano',
        'Morgan Freeman',
        'Frank Sinatra',
        'James Stewart',
        'John Mason',
        'Frankie Machine',
        'Ralph "Skid" Johnson',
        'Aliquam erat volutpat. ',
        'Bonny Lee King',
        'John Brant',
    ];

    let people = [];
    people.push(peoplePart[getRandomInteger(0, peoplePart.length - 1)]);
    for (let i = 0; i < 3; i++) {
        if (getRandomInteger(0, 1)) {
            people.push(peoplePart[getRandomInteger(0, peoplePart.length - 1)]);
        }
    }

    return people;
}

const generateGenre = () => {
    const genrePart = [
        'Comedy',
        'Drama',
        'Nuar',
        'Action',
        'Musical',
        'Detective',
        'Erotic',
        'Trash',
    ];

    let genre = [];
    let random = getRandomInteger(0, genrePart.length - 1);
    genre.push(genrePart[random]);
    genrePart.splice(random);
    for (let i = 0; i < 3; i++) {
        if (getRandomInteger(0, 1)) {
            let random = getRandomInteger(0, genrePart.length - 1);
            genre.push(genrePart[random]);
            genrePart.splice(random);
        }
    }

    return genre;
}


const generatePoster = () => {
    const posters = [
        'made-for-each-other.png',
        'popeye-meets-sinbad.png',
        'sagebrush-trail.jpg',
        'santa-claus-conquers-the-martians.jpg',
        'the-dance-of-life.jpg',
        'the-great-flamarion.jpg',
        'the-man-with-the-golden-arm.jpg',
    ];

    const randomIndex = getRandomInteger(0, posters.length - 1);

    return './images/posters/' + posters[randomIndex];
}

const generateRating = () => {
    return parseFloat(getRandomInteger(0, 9) + '.' + getRandomInteger(0, 9));
}

export const generateFilm = () => {
    return {
        id: getRandomInteger(1000000, 9999999),
        comments: new Array (getRandomInteger(0,6)).fill().map(() => getRandomInteger(0, 50)),
        film_info: {
            title: generateTitle(),
            alternative_title: generateTitle(),
            total_rating: generateRating(),
            poster: generatePoster(),
            age_rating: getRandomInteger(0, 18),
            director: generatePeople()[0],
            writers: generatePeople(),
            actors: generatePeople(),
            release: {
                date: generateDate('created'),
                release_country: generateCountry(),
            },
            runtime: getRandomInteger(30, 420),
            genre: generateGenre(),
            description: generateDescription(),
        },
        user_details: {
            watchlist: Boolean(getRandomInteger(0, 1)),
            already_watched: Boolean(getRandomInteger(0, 1)),
            watching_date: generateDate('watched'),
            favorite: Boolean(getRandomInteger(0, 1)),
        }

    }
}
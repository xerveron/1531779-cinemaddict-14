import dayjs from 'dayjs';

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));

    return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateCommentText = () => {
    const commentPart = [
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

    let comment = '';

    for (let i = 0; i < 5; i++) {
        if (getRandomInteger(0, 1)) {
            comment += commentPart[getRandomInteger(0, commentPart.length - 1)];
        }
    }

    return comment;
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

    for (let i = 0; i < 3; i++) {
        if (getRandomInteger(0, 1)) {
            people.push(peoplePart[getRandomInteger(0, peoplePart.length - 1)]);
        }
    }

    return people;
}

export const generateComments = (id) => {
    return {
        id: String(id),
        author: generatePeople(),
        comment: generateCommentText(),
        date: dayjs().add(getRandomInteger(-100,0), 'day').toDate(),
        emotion: EMOTIONS[getRandomInteger(0,EMOTIONS.length-1)]
    }
}

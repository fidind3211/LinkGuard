import axios from 'axios';
import config from '../../config.js';

export default async () => {
    let users = {};

    try {
        const response = await axios.get(`https://raw.githack.com/${config.repository.name}/${config.repository.tree}/Leakers.md`);

        response.data.split('\n').filter(e => e.startsWith('<@!')).forEach(line => {
            users[line.split(' | ')[0]] = {
                mention: line.split(' | ')[0],
                username: line.split(' | ')[1],
                reason: line.split(' | ')[2],
                proof: line.split(' | ')[3],
            }
        });
        
        return users;
    } catch (error) {
        console.error('Error', error);
        return [];
    };
};
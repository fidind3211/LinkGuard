import axios from 'axios';
import * as cheerio from 'cheerio';
import config from '../../config.js';

export default async () => {
    let users = {};

    try {
        const response = await axios.get(config.db.sheetLink);
        const $ = cheerio.load(response.data);
        
        $('table tbody tr:gt(0)').each((index, row) => {
            const columns = $(row).find('td');
            if (index < 2 || columns.eq(0).text().includes('Quotes') || columns.eq(0).text().trim() === '') return;
            
            users[columns.eq(0).text().trim().match(/<@(.*?)>/)[1]] = {
                mention: columns.eq(0).text().trim(),
                username: columns.eq(1).text().trim(),
                reason: columns.eq(2).text().trim(),
                added: columns.eq(3).text().trim(),
                proof: columns.eq(4).text().trim(),
            };
        });
        
        return users;
    } catch (error) {
        console.error('Error', error);
        return [];
    };
};
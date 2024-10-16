import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
    auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
});

export const getDatabase = async (databaseId: string): Promise<PageObjectResponse[]> => {
    try {
      const response = await notion.databases.query({ database_id: databaseId });
      return response.results as PageObjectResponse[]; 
    } catch (error) {
      console.error('Error fetching Notion database:', error);
      throw error;
    }
};


const NotionDB = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try{
            const { textid } = req.query;

            if (typeof textid !== 'string') {
              return res.status(400).json({ error: 'Invalid textid' });
            }

            const DataBase = await getDatabase(textid);
            res.status(200).json({ DataBase });

        } catch(error){
            console.error(error);
            res.status(500).json({ error: 'Failed to retrieve blocks' });
        }
    } else{
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default NotionDB;
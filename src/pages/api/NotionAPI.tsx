import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

export interface Block {
    object: string;
    id: string;
    type: string;
    has_children: boolean;
    [key: string]: any;
  }

export const getBlocks = async (textid: string): Promise<Block[]> => {
    const blocks: Block[] = [];
    let cursor: string | undefined = undefined;
  
    while (true) {
      const { results, next_cursor } = await notion.blocks.children.list({
        start_cursor: cursor ?? undefined,
        block_id: textid,
      });
  
      blocks.push(...(results as Block[])); 
  
      if (!next_cursor) {
        break;
      }
      cursor = next_cursor;
    }
  
    return blocks;
};

const NotionAPI = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try{
            const { textid } = req.query;

            if (typeof textid !== 'string') {
              return res.status(400).json({ error: 'Invalid textid' });
            }

            const blocks = await getBlocks(textid);
            res.status(200).json({ blocks });

        } catch(error){
            console.error(error);
            res.status(500).json({ error: 'Failed to retrieve blocks' });
        }
    } else{
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default NotionAPI;
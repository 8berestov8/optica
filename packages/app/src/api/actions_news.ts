import API from '@/api/index';
import { ActionNew } from '@/interfaces/ActionsNews';

export const getActionsNews = async () => {
  try {
    const anctions_news: ActionNew[] = [];
    const response = await API.get(`/actions-and-news?populate=*`);

    if (response.data) {
      response.data.map((p: any) => {
        anctions_news.push({
          id: p.id,
          title: p.attributes.title,
          description: p.attributes.description,
          url:
            process.env.VUE_APP_SERVER + p.attributes.image.data.attributes.url,
        });
      });
    }
    return anctions_news;
  } catch (e) {
    console.error(e);
  }
};

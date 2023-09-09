import qs from 'qs';
import API from './index';
import { Categorie } from '@/interfaces/CategorieInterface';
import { Brand, Image, Period, Type } from '@/interfaces/ProductInterface';

export const getCategories = async (): Promise<Categorie[] | undefined> => {
  try {
    const paramString = qs.stringify({
      populate: [
        'title',
        'description',
        'price',
        'image',
        'period',
        'brand',
        'delivery',
        'discount',
        'type',
      ],
    });
    const categories: Categorie[] = [];
    const { data } = await API.get(`/categories?${paramString}`);

    if (data) {
      data.map((p: any) => {
        //extract images
        const images: Image[] = [];
        // if Categorie has images map to Image Interface
        if (Object.hasOwnProperty.call(p.attributes, 'image')) {
          const img = p.attributes.image.data ?? [];
          img.map((i: any) => {
            images.push({
              id: Number(i.id),
              url: process.env.VUE_APP_SERVER + i.attributes.url,
              thumbnailUrl:
                process.env.VUE_APP_SERVER +
                  i.attributes.formats.thumbnail.url ?? '',
              alternativeText: '',
              caption: '',
            });
          });
        }

        // if Categorie has manufacturer map to Period Interface
        const period: Period = { id: 0, title: '' };
        if (Object.hasOwnProperty.call(p.attributes, 'period')) {
          const m = p.attributes.period.data;
          period.id = m?.id;
          period.title = m?.attributes.title;
        }

        // if Categorie has manufacturer map to Period Interface
        const brand: Brand = { id: 0, title: '' };
        if (Object.hasOwnProperty.call(p.attributes, 'brand')) {
          const m = p.attributes.brand.data;
          brand.id = m?.id;
          brand.title = m?.attributes.title;
        }

        // if Categorie has manufacturer map to Type Interface
        const type: Type = { id: 0, title: '', description: '' };
        if (Object.hasOwnProperty.call(p.attributes, 'type')) {
          const m = p.attributes.type.data;
          type.id = m?.id;
          type.title = m?.attributes.title;
          type.description = m?.attributes.description;
        }

        // // console.log(sphere);
        categories.push({
          id: p.id,
          title: p.attributes.title,
          description: p.attributes.description,
          price: p.attributes.price,
          image: images,
          period: period.title,
          brand: brand.title,
          type: type.title,
          discount: p.attributes.discount,
          delivery: p.attributes.delivery,
          categorie_id: p.id,
        });
      });
    }
    // console.log(categories);
    return categories;
  } catch (e) {
    console.error(e);
  }
};

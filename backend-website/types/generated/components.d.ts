import type { Schema, Struct } from '@strapi/strapi';

export interface SharedContact extends Struct.ComponentSchema {
  collectionName: 'components_shared_contacts';
  info: {
    displayName: 'Contact';
  };
  attributes: {
    email: Schema.Attribute.String;
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    tiktok: Schema.Attribute.String;
    website: Schema.Attribute.String;
    whatsapp: Schema.Attribute.String;
  };
}

export interface SharedLocation extends Struct.ComponentSchema {
  collectionName: 'components_shared_locations';
  info: {
    displayName: 'Location';
  };
  attributes: {
    address: Schema.Attribute.Text;
    latitude: Schema.Attribute.Decimal;
    longitude: Schema.Attribute.Decimal;
    neighborhood: Schema.Attribute.Text;
  };
}

export interface SharedSchedule extends Struct.ComponentSchema {
  collectionName: 'components_shared_schedules';
  info: {
    displayName: 'Schedule';
  };
  attributes: {
    fridayClose: Schema.Attribute.Time;
    fridayOpen: Schema.Attribute.Time;
    mondayClose: Schema.Attribute.Time;
    mondayOpen: Schema.Attribute.Time;
    saturdayClose: Schema.Attribute.Time;
    saturdayOpen: Schema.Attribute.Time;
    sundayClose: Schema.Attribute.Time;
    sundayOpen: Schema.Attribute.Time;
    thursdayClose: Schema.Attribute.Time;
    thursdayOpen: Schema.Attribute.Time;
    tuesdayClose: Schema.Attribute.Time;
    tuesdayOpen: Schema.Attribute.Time;
    wednesdayClose: Schema.Attribute.Time;
    wednesdayOpen: Schema.Attribute.Time;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    ogImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'SocialLinks';
  };
  attributes: {
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    tiktok: Schema.Attribute.String;
    website: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.contact': SharedContact;
      'shared.location': SharedLocation;
      'shared.schedule': SharedSchedule;
      'shared.seo': SharedSeo;
      'shared.social-links': SharedSocialLinks;
    }
  }
}

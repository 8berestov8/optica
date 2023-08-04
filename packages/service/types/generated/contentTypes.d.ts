import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    phone: Attribute.String &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        maxLength: 11;
      }>;
    orders: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::order.order'
    >;
    firstname: Attribute.String;
    lastname: Attribute.String;
    patronymic: Attribute.String;
    birthday: Attribute.String;
    deliverTo: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::address.address'
    >;
    appointments: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::appointment.appointment'
    >;
    pushes: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::push.push'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginPublisherAction extends Schema.CollectionType {
  collectionName: 'actions';
  info: {
    singularName: 'action';
    pluralName: 'actions';
    displayName: 'actions';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    executeAt: Attribute.DateTime;
    mode: Attribute.String;
    entityId: Attribute.Integer;
    entitySlug: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::publisher.action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::publisher.action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAddAdd extends Schema.CollectionType {
  collectionName: 'adds';
  info: {
    singularName: 'add';
    pluralName: 'adds';
    displayName: 'ADD';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    products: Attribute.Relation<
      'api::add.add',
      'manyToMany',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::add.add', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::add.add', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiAddressAddress extends Schema.CollectionType {
  collectionName: 'addresses';
  info: {
    singularName: 'address';
    pluralName: 'addresses';
    displayName: 'Addresses';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    street: Attribute.String;
    number: Attribute.String;
    postcode: Attribute.String;
    city: Attribute.String;
    entrance: Attribute.String;
    floor: Attribute.String;
    user: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    order: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'api::order.order'
    >;
    optic: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'api::optica.optica'
    >;
    apartment: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAppointmentAppointment extends Schema.CollectionType {
  collectionName: 'appointments';
  info: {
    singularName: 'appointment';
    pluralName: 'appointments';
    displayName: 'Appointment';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    date: Attribute.String;
    reserved: Attribute.Boolean;
    booked: Attribute.Boolean & Attribute.DefaultTo<false>;
    doctor: Attribute.Relation<
      'api::appointment.appointment',
      'manyToOne',
      'api::doctor.doctor'
    >;
    optic: Attribute.Relation<
      'api::appointment.appointment',
      'manyToOne',
      'api::optica.optica'
    >;
    service: Attribute.String;
    user: Attribute.Relation<
      'api::appointment.appointment',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    recording: Attribute.Relation<
      'api::appointment.appointment',
      'manyToOne',
      'api::recording.recording'
    >;
    visit: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::appointment.appointment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::appointment.appointment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAxisAxis extends Schema.CollectionType {
  collectionName: 'axes';
  info: {
    singularName: 'axis';
    pluralName: 'axes';
    displayName: 'Axis';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    products: Attribute.Relation<
      'api::axis.axis',
      'manyToMany',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::axis.axis', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::axis.axis', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiBrandBrand extends Schema.CollectionType {
  collectionName: 'brands';
  info: {
    singularName: 'brand';
    pluralName: 'brands';
    displayName: 'Brand';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    products: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::product.product'
    >;
    categories: Attribute.Relation<
      'api::brand.brand',
      'oneToMany',
      'api::categorie.categorie'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::brand.brand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::brand.brand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategorieCategorie extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'categorie';
    pluralName: 'categories';
    displayName: 'Categorie';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    image: Attribute.Media;
    title: Attribute.String;
    products: Attribute.Relation<
      'api::categorie.categorie',
      'oneToMany',
      'api::product.product'
    >;
    period: Attribute.Relation<
      'api::categorie.categorie',
      'manyToOne',
      'api::period.period'
    >;
    type: Attribute.Relation<
      'api::categorie.categorie',
      'manyToOne',
      'api::type.type'
    >;
    brand: Attribute.Relation<
      'api::categorie.categorie',
      'manyToOne',
      'api::brand.brand'
    >;
    price: Attribute.String;
    discount: Attribute.String;
    delivery: Attribute.RichText;
    description: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::categorie.categorie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::categorie.categorie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCylinderCylinder extends Schema.CollectionType {
  collectionName: 'cylinders';
  info: {
    singularName: 'cylinder';
    pluralName: 'cylinders';
    displayName: 'Cylinder';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    products: Attribute.Relation<
      'api::cylinder.cylinder',
      'manyToMany',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cylinder.cylinder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cylinder.cylinder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDiameterDiameter extends Schema.CollectionType {
  collectionName: 'diameters';
  info: {
    singularName: 'diameter';
    pluralName: 'diameters';
    displayName: 'Diameter';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    products: Attribute.Relation<
      'api::diameter.diameter',
      'oneToMany',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::diameter.diameter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::diameter.diameter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDoctorDoctor extends Schema.CollectionType {
  collectionName: 'doctors';
  info: {
    singularName: 'doctor';
    pluralName: 'doctors';
    displayName: 'Doctor';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    phone: Attribute.String;
    email: Attribute.Email;
    avatar: Attribute.Media;
    optica: Attribute.Relation<
      'api::doctor.doctor',
      'manyToOne',
      'api::optica.optica'
    >;
    appointments: Attribute.Relation<
      'api::doctor.doctor',
      'oneToMany',
      'api::appointment.appointment'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::doctor.doctor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::doctor.doctor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDominantDominant extends Schema.CollectionType {
  collectionName: 'dominants';
  info: {
    singularName: 'dominant';
    pluralName: 'dominants';
    displayName: 'Dominant';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    products: Attribute.Relation<
      'api::dominant.dominant',
      'manyToMany',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dominant.dominant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dominant.dominant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFcmFcm extends Schema.CollectionType {
  collectionName: 'fcms';
  info: {
    singularName: 'fcm';
    pluralName: 'fcms';
    displayName: 'FCM';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    token: Attribute.String & Attribute.Required;
    userId: Attribute.Integer & Attribute.Required;
    device: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::fcm.fcm', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::fcm.fcm', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiManufacturerManufacturer extends Schema.CollectionType {
  collectionName: 'manufacturers';
  info: {
    singularName: 'manufacturer';
    pluralName: 'manufacturers';
    displayName: 'Manufacturer';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    products: Attribute.Relation<
      'api::manufacturer.manufacturer',
      'oneToMany',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::manufacturer.manufacturer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::manufacturer.manufacturer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMaterialMaterial extends Schema.CollectionType {
  collectionName: 'materials';
  info: {
    singularName: 'material';
    pluralName: 'materials';
    displayName: 'Material';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    products: Attribute.Relation<
      'api::material.material',
      'oneToMany',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::material.material',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::material.material',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOpticaOptica extends Schema.CollectionType {
  collectionName: 'optics';
  info: {
    singularName: 'optica';
    pluralName: 'optics';
    displayName: 'Optics';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    doctors: Attribute.Relation<
      'api::optica.optica',
      'oneToMany',
      'api::doctor.doctor'
    >;
    appointments: Attribute.Relation<
      'api::optica.optica',
      'oneToMany',
      'api::appointment.appointment'
    >;
    address: Attribute.Relation<
      'api::optica.optica',
      'oneToOne',
      'api::address.address'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::optica.optica',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::optica.optica',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrderOrder extends Schema.CollectionType {
  collectionName: 'orders';
  info: {
    singularName: 'order';
    pluralName: 'orders';
    displayName: 'Order';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    order_product_details: Attribute.Relation<
      'api::order.order',
      'oneToMany',
      'api::order-product-detail.order-product-detail'
    >;
    user: Attribute.Relation<
      'api::order.order',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    deliverTo: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'api::address.address'
    >;
    count: Attribute.Integer;
    total_amount: Attribute.Integer;
    total_discount: Attribute.Integer;
    status_delivery: Attribute.Relation<
      'api::order.order',
      'manyToOne',
      'api::status-delivery.status-delivery'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrderProductDetailOrderProductDetail
  extends Schema.CollectionType {
  collectionName: 'order_product_details';
  info: {
    singularName: 'order-product-detail';
    pluralName: 'order-product-details';
    displayName: 'Order Product Detail';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    product: Attribute.Relation<
      'api::order-product-detail.order-product-detail',
      'manyToOne',
      'api::product.product'
    >;
    radius: Attribute.Relation<
      'api::order-product-detail.order-product-detail',
      'manyToOne',
      'api::radius.radius'
    >;
    sphere: Attribute.Relation<
      'api::order-product-detail.order-product-detail',
      'manyToOne',
      'api::sphere.sphere'
    >;
    order: Attribute.Relation<
      'api::order-product-detail.order-product-detail',
      'manyToOne',
      'api::order.order'
    >;
    product_count: Attribute.Integer;
    product_amount: Attribute.Integer;
    product_discount: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::order-product-detail.order-product-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order-product-detail.order-product-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPeriodPeriod extends Schema.CollectionType {
  collectionName: 'periods';
  info: {
    singularName: 'period';
    pluralName: 'periods';
    displayName: 'Period';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    products: Attribute.Relation<
      'api::period.period',
      'oneToMany',
      'api::product.product'
    >;
    categories: Attribute.Relation<
      'api::period.period',
      'oneToMany',
      'api::categorie.categorie'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::period.period',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::period.period',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    price: Attribute.String;
    image: Attribute.Media;
    brand: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::brand.brand'
    >;
    manufacturer: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::manufacturer.manufacturer'
    >;
    material: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::material.material'
    >;
    diameter: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::diameter.diameter'
    >;
    short_title: Attribute.String;
    discount: Attribute.String;
    period: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::period.period'
    >;
    radius: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::radius.radius'
    >;
    sphere: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::sphere.sphere'
    >;
    type: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::type.type'
    >;
    order_product_details: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::order-product-detail.order-product-detail'
    >;
    adds: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::add.add'
    >;
    cylinders: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::cylinder.cylinder'
    >;
    axes: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::axis.axis'
    >;
    dominants: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::dominant.dominant'
    >;
    waters: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::water.water'
    >;
    categorie: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::categorie.categorie'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPushPush extends Schema.CollectionType {
  collectionName: 'pushes';
  info: {
    singularName: 'push';
    pluralName: 'pushes';
    displayName: 'Push';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    userId: Attribute.Integer;
    title: Attribute.String & Attribute.Required;
    body: Attribute.String & Attribute.Required;
    publish_at: Attribute.DateTime & Attribute.Required;
    user: Attribute.Relation<
      'api::push.push',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::push.push', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::push.push', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiRadiusRadius extends Schema.CollectionType {
  collectionName: 'radii';
  info: {
    singularName: 'radius';
    pluralName: 'radii';
    displayName: 'Radius';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    products: Attribute.Relation<
      'api::radius.radius',
      'manyToMany',
      'api::product.product'
    >;
    order_product_details: Attribute.Relation<
      'api::radius.radius',
      'oneToMany',
      'api::order-product-detail.order-product-detail'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::radius.radius',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::radius.radius',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRecordingRecording extends Schema.CollectionType {
  collectionName: 'recordings';
  info: {
    singularName: 'recording';
    pluralName: 'recordings';
    displayName: 'RecordingTime';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    time: Attribute.String;
    appointments: Attribute.Relation<
      'api::recording.recording',
      'oneToMany',
      'api::appointment.appointment'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::recording.recording',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::recording.recording',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSphereSphere extends Schema.CollectionType {
  collectionName: 'spheres';
  info: {
    singularName: 'sphere';
    pluralName: 'spheres';
    displayName: 'Sphere';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    products: Attribute.Relation<
      'api::sphere.sphere',
      'manyToMany',
      'api::product.product'
    >;
    order_product_details: Attribute.Relation<
      'api::sphere.sphere',
      'oneToMany',
      'api::order-product-detail.order-product-detail'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sphere.sphere',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sphere.sphere',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStatusDeliveryStatusDelivery extends Schema.CollectionType {
  collectionName: 'status_deliveries';
  info: {
    singularName: 'status-delivery';
    pluralName: 'status-deliveries';
    displayName: 'Status Delivery';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    orders: Attribute.Relation<
      'api::status-delivery.status-delivery',
      'oneToMany',
      'api::order.order'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::status-delivery.status-delivery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::status-delivery.status-delivery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTypeType extends Schema.CollectionType {
  collectionName: 'types';
  info: {
    singularName: 'type';
    pluralName: 'types';
    displayName: 'Type';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    products: Attribute.Relation<
      'api::type.type',
      'oneToMany',
      'api::product.product'
    >;
    categories: Attribute.Relation<
      'api::type.type',
      'oneToMany',
      'api::categorie.categorie'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::type.type', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::type.type', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiWaterWater extends Schema.CollectionType {
  collectionName: 'waters';
  info: {
    singularName: 'water';
    pluralName: 'waters';
    displayName: 'Water';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    products: Attribute.Relation<
      'api::water.water',
      'manyToMany',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::water.water',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::water.water',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::publisher.action': PluginPublisherAction;
      'api::add.add': ApiAddAdd;
      'api::address.address': ApiAddressAddress;
      'api::appointment.appointment': ApiAppointmentAppointment;
      'api::axis.axis': ApiAxisAxis;
      'api::brand.brand': ApiBrandBrand;
      'api::categorie.categorie': ApiCategorieCategorie;
      'api::cylinder.cylinder': ApiCylinderCylinder;
      'api::diameter.diameter': ApiDiameterDiameter;
      'api::doctor.doctor': ApiDoctorDoctor;
      'api::dominant.dominant': ApiDominantDominant;
      'api::fcm.fcm': ApiFcmFcm;
      'api::manufacturer.manufacturer': ApiManufacturerManufacturer;
      'api::material.material': ApiMaterialMaterial;
      'api::optica.optica': ApiOpticaOptica;
      'api::order.order': ApiOrderOrder;
      'api::order-product-detail.order-product-detail': ApiOrderProductDetailOrderProductDetail;
      'api::period.period': ApiPeriodPeriod;
      'api::product.product': ApiProductProduct;
      'api::push.push': ApiPushPush;
      'api::radius.radius': ApiRadiusRadius;
      'api::recording.recording': ApiRecordingRecording;
      'api::sphere.sphere': ApiSphereSphere;
      'api::status-delivery.status-delivery': ApiStatusDeliveryStatusDelivery;
      'api::type.type': ApiTypeType;
      'api::water.water': ApiWaterWater;
    }
  }
}

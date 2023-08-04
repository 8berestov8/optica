import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  MediaAttribute,
  RichTextAttribute,
  TextAttribute,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
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
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
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
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
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
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
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
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
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
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
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
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
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
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
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
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
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
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
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
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
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
    username: StringAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    phone: StringAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        maxLength: 11;
      }>;
    orders: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::order.order'
    >;
    firstname: StringAttribute;
    lastname: StringAttribute;
    patronymic: StringAttribute;
    birthday: StringAttribute;
    fcm: StringAttribute;
    deliverTo: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::address.address'
    >;
    appointments: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::appointment.appointment'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiAddAdd extends CollectionTypeSchema {
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
    title: StringAttribute;
    products: RelationAttribute<
      'api::add.add',
      'manyToMany',
      'api::product.product'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::add.add', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::add.add', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiAddressAddress extends CollectionTypeSchema {
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
    street: StringAttribute;
    number: StringAttribute;
    postcode: StringAttribute;
    city: StringAttribute;
    entrance: StringAttribute;
    floor: StringAttribute;
    user: RelationAttribute<
      'api::address.address',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    order: RelationAttribute<
      'api::address.address',
      'oneToOne',
      'api::order.order'
    >;
    optic: RelationAttribute<
      'api::address.address',
      'oneToOne',
      'api::optica.optica'
    >;
    apartment: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiAppointmentAppointment extends CollectionTypeSchema {
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
    date: StringAttribute;
    reserved: BooleanAttribute;
    booked: BooleanAttribute & DefaultTo<false>;
    doctor: RelationAttribute<
      'api::appointment.appointment',
      'manyToOne',
      'api::doctor.doctor'
    >;
    optic: RelationAttribute<
      'api::appointment.appointment',
      'manyToOne',
      'api::optica.optica'
    >;
    service: StringAttribute;
    user: RelationAttribute<
      'api::appointment.appointment',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    recording: RelationAttribute<
      'api::appointment.appointment',
      'manyToOne',
      'api::recording.recording'
    >;
    visit: BooleanAttribute & DefaultTo<false>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::appointment.appointment',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::appointment.appointment',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiAxisAxis extends CollectionTypeSchema {
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
    title: StringAttribute;
    products: RelationAttribute<
      'api::axis.axis',
      'manyToMany',
      'api::product.product'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::axis.axis', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::axis.axis', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiBrandBrand extends CollectionTypeSchema {
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
    title: StringAttribute;
    products: RelationAttribute<
      'api::brand.brand',
      'oneToMany',
      'api::product.product'
    >;
    categories: RelationAttribute<
      'api::brand.brand',
      'oneToMany',
      'api::categorie.categorie'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::brand.brand',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::brand.brand',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCategorieCategorie extends CollectionTypeSchema {
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
    image: MediaAttribute;
    title: StringAttribute;
    products: RelationAttribute<
      'api::categorie.categorie',
      'oneToMany',
      'api::product.product'
    >;
    period: RelationAttribute<
      'api::categorie.categorie',
      'manyToOne',
      'api::period.period'
    >;
    type: RelationAttribute<
      'api::categorie.categorie',
      'manyToOne',
      'api::type.type'
    >;
    brand: RelationAttribute<
      'api::categorie.categorie',
      'manyToOne',
      'api::brand.brand'
    >;
    price: StringAttribute;
    discount: StringAttribute;
    delivery: RichTextAttribute;
    description: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::categorie.categorie',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::categorie.categorie',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCylinderCylinder extends CollectionTypeSchema {
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
    title: StringAttribute;
    products: RelationAttribute<
      'api::cylinder.cylinder',
      'manyToMany',
      'api::product.product'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::cylinder.cylinder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::cylinder.cylinder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiDiameterDiameter extends CollectionTypeSchema {
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
    title: StringAttribute;
    products: RelationAttribute<
      'api::diameter.diameter',
      'oneToMany',
      'api::product.product'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::diameter.diameter',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::diameter.diameter',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiDoctorDoctor extends CollectionTypeSchema {
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
    name: StringAttribute;
    phone: StringAttribute;
    email: EmailAttribute;
    avatar: MediaAttribute;
    optica: RelationAttribute<
      'api::doctor.doctor',
      'manyToOne',
      'api::optica.optica'
    >;
    appointments: RelationAttribute<
      'api::doctor.doctor',
      'oneToMany',
      'api::appointment.appointment'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::doctor.doctor',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::doctor.doctor',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiDominantDominant extends CollectionTypeSchema {
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
    title: StringAttribute;
    products: RelationAttribute<
      'api::dominant.dominant',
      'manyToMany',
      'api::product.product'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::dominant.dominant',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::dominant.dominant',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiManufacturerManufacturer extends CollectionTypeSchema {
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
    title: StringAttribute;
    products: RelationAttribute<
      'api::manufacturer.manufacturer',
      'oneToMany',
      'api::product.product'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::manufacturer.manufacturer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::manufacturer.manufacturer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMaterialMaterial extends CollectionTypeSchema {
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
    title: StringAttribute;
    products: RelationAttribute<
      'api::material.material',
      'oneToMany',
      'api::product.product'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::material.material',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::material.material',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiOpticaOptica extends CollectionTypeSchema {
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
    title: StringAttribute;
    description: TextAttribute;
    doctors: RelationAttribute<
      'api::optica.optica',
      'oneToMany',
      'api::doctor.doctor'
    >;
    appointments: RelationAttribute<
      'api::optica.optica',
      'oneToMany',
      'api::appointment.appointment'
    >;
    address: RelationAttribute<
      'api::optica.optica',
      'oneToOne',
      'api::address.address'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::optica.optica',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::optica.optica',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiOrderOrder extends CollectionTypeSchema {
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
    order_product_details: RelationAttribute<
      'api::order.order',
      'oneToMany',
      'api::order-product-detail.order-product-detail'
    >;
    user: RelationAttribute<
      'api::order.order',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    deliverTo: RelationAttribute<
      'api::order.order',
      'oneToOne',
      'api::address.address'
    >;
    count: IntegerAttribute;
    total_amount: IntegerAttribute;
    total_discount: IntegerAttribute;
    status_delivery: RelationAttribute<
      'api::order.order',
      'manyToOne',
      'api::status-delivery.status-delivery'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiOrderProductDetailOrderProductDetail
  extends CollectionTypeSchema {
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
    product: RelationAttribute<
      'api::order-product-detail.order-product-detail',
      'manyToOne',
      'api::product.product'
    >;
    radius: RelationAttribute<
      'api::order-product-detail.order-product-detail',
      'manyToOne',
      'api::radius.radius'
    >;
    sphere: RelationAttribute<
      'api::order-product-detail.order-product-detail',
      'manyToOne',
      'api::sphere.sphere'
    >;
    order: RelationAttribute<
      'api::order-product-detail.order-product-detail',
      'manyToOne',
      'api::order.order'
    >;
    product_count: IntegerAttribute;
    product_amount: IntegerAttribute;
    product_discount: IntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::order-product-detail.order-product-detail',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::order-product-detail.order-product-detail',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiPeriodPeriod extends CollectionTypeSchema {
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
    title: StringAttribute;
    products: RelationAttribute<
      'api::period.period',
      'oneToMany',
      'api::product.product'
    >;
    categories: RelationAttribute<
      'api::period.period',
      'oneToMany',
      'api::categorie.categorie'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::period.period',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::period.period',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiProductProduct extends CollectionTypeSchema {
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
    title: StringAttribute;
    price: StringAttribute;
    image: MediaAttribute;
    brand: RelationAttribute<
      'api::product.product',
      'manyToOne',
      'api::brand.brand'
    >;
    manufacturer: RelationAttribute<
      'api::product.product',
      'manyToOne',
      'api::manufacturer.manufacturer'
    >;
    material: RelationAttribute<
      'api::product.product',
      'manyToOne',
      'api::material.material'
    >;
    diameter: RelationAttribute<
      'api::product.product',
      'manyToOne',
      'api::diameter.diameter'
    >;
    short_title: StringAttribute;
    discount: StringAttribute;
    period: RelationAttribute<
      'api::product.product',
      'manyToOne',
      'api::period.period'
    >;
    radius: RelationAttribute<
      'api::product.product',
      'manyToMany',
      'api::radius.radius'
    >;
    sphere: RelationAttribute<
      'api::product.product',
      'manyToMany',
      'api::sphere.sphere'
    >;
    type: RelationAttribute<
      'api::product.product',
      'manyToOne',
      'api::type.type'
    >;
    order_product_details: RelationAttribute<
      'api::product.product',
      'oneToMany',
      'api::order-product-detail.order-product-detail'
    >;
    adds: RelationAttribute<
      'api::product.product',
      'manyToMany',
      'api::add.add'
    >;
    cylinders: RelationAttribute<
      'api::product.product',
      'manyToMany',
      'api::cylinder.cylinder'
    >;
    axes: RelationAttribute<
      'api::product.product',
      'manyToMany',
      'api::axis.axis'
    >;
    dominants: RelationAttribute<
      'api::product.product',
      'manyToMany',
      'api::dominant.dominant'
    >;
    waters: RelationAttribute<
      'api::product.product',
      'manyToMany',
      'api::water.water'
    >;
    categorie: RelationAttribute<
      'api::product.product',
      'manyToOne',
      'api::categorie.categorie'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiRadiusRadius extends CollectionTypeSchema {
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
    title: StringAttribute;
    products: RelationAttribute<
      'api::radius.radius',
      'manyToMany',
      'api::product.product'
    >;
    order_product_details: RelationAttribute<
      'api::radius.radius',
      'oneToMany',
      'api::order-product-detail.order-product-detail'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::radius.radius',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::radius.radius',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiRecordingRecording extends CollectionTypeSchema {
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
    time: StringAttribute;
    appointments: RelationAttribute<
      'api::recording.recording',
      'oneToMany',
      'api::appointment.appointment'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::recording.recording',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::recording.recording',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiSphereSphere extends CollectionTypeSchema {
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
    title: StringAttribute;
    products: RelationAttribute<
      'api::sphere.sphere',
      'manyToMany',
      'api::product.product'
    >;
    order_product_details: RelationAttribute<
      'api::sphere.sphere',
      'oneToMany',
      'api::order-product-detail.order-product-detail'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::sphere.sphere',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::sphere.sphere',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiStatusDeliveryStatusDelivery extends CollectionTypeSchema {
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
    title: StringAttribute;
    orders: RelationAttribute<
      'api::status-delivery.status-delivery',
      'oneToMany',
      'api::order.order'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::status-delivery.status-delivery',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::status-delivery.status-delivery',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiTypeType extends CollectionTypeSchema {
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
    title: StringAttribute;
    description: TextAttribute;
    products: RelationAttribute<
      'api::type.type',
      'oneToMany',
      'api::product.product'
    >;
    categories: RelationAttribute<
      'api::type.type',
      'oneToMany',
      'api::categorie.categorie'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::type.type', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::type.type', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiWaterWater extends CollectionTypeSchema {
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
    title: StringAttribute;
    products: RelationAttribute<
      'api::water.water',
      'manyToMany',
      'api::product.product'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::water.water',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::water.water',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
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
      'api::manufacturer.manufacturer': ApiManufacturerManufacturer;
      'api::material.material': ApiMaterialMaterial;
      'api::optica.optica': ApiOpticaOptica;
      'api::order.order': ApiOrderOrder;
      'api::order-product-detail.order-product-detail': ApiOrderProductDetailOrderProductDetail;
      'api::period.period': ApiPeriodPeriod;
      'api::product.product': ApiProductProduct;
      'api::radius.radius': ApiRadiusRadius;
      'api::recording.recording': ApiRecordingRecording;
      'api::sphere.sphere': ApiSphereSphere;
      'api::status-delivery.status-delivery': ApiStatusDeliveryStatusDelivery;
      'api::type.type': ApiTypeType;
      'api::water.water': ApiWaterWater;
    }
  }
}

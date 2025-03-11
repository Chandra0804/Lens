declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { Component } from 'react';
  import { TextStyle, ViewStyle } from 'react-native';

  interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: TextStyle | ViewStyle;
  }

  export default class MaterialCommunityIcons extends Component<IconProps> {
    static getImageSource(
      name: string,
      size?: number,
      color?: string,
    ): Promise<any>;
    static loadFont(file?: string): Promise<void>;
    static hasIcon(name: string): boolean;
  }
}

declare module 'react-native-vector-icons/MaterialIcons' {
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  export default class MaterialIcons extends MaterialCommunityIcons {}
}

declare module 'react-native-vector-icons/FontAwesome' {
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  export default class FontAwesome extends MaterialCommunityIcons {}
}

declare module 'react-native-vector-icons/FontAwesome5' {
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  export default class FontAwesome5 extends MaterialCommunityIcons {}
}

declare module 'react-native-vector-icons/Ionicons' {
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  export default class Ionicons extends MaterialCommunityIcons {}
}

declare module 'react-native-vector-icons/AntDesign' {
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  export default class AntDesign extends MaterialCommunityIcons {}
}

declare module 'react-native-vector-icons/Entypo' {
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  export default class Entypo extends MaterialCommunityIcons {}
}

declare module 'react-native-vector-icons/EvilIcons' {
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  export default class EvilIcons extends MaterialCommunityIcons {}
}

declare module 'react-native-vector-icons/Feather' {
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  export default class Feather extends MaterialCommunityIcons {}
}

declare module 'react-native-vector-icons/Foundation' {
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  export default class Foundation extends MaterialCommunityIcons {}
}

declare module 'react-native-vector-icons/Octicons' {
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  export default class Octicons extends MaterialCommunityIcons {}
}

declare module 'react-native-vector-icons/SimpleLineIcons' {
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  export default class SimpleLineIcons extends MaterialCommunityIcons {}
}

declare module 'react-native-vector-icons/Zocial' {
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  export default class Zocial extends MaterialCommunityIcons {}
}

declare module 'react-native-vector-icons' {
  export import MaterialCommunityIcons = require('react-native-vector-icons/MaterialCommunityIcons');
  export import MaterialIcons = require('react-native-vector-icons/MaterialIcons');
  export import FontAwesome = require('react-native-vector-icons/FontAwesome');
  export import FontAwesome5 = require('react-native-vector-icons/FontAwesome5');
  export import Ionicons = require('react-native-vector-icons/Ionicons');
  export import AntDesign = require('react-native-vector-icons/AntDesign');
  export import Entypo = require('react-native-vector-icons/Entypo');
  export import EvilIcons = require('react-native-vector-icons/EvilIcons');
  export import Feather = require('react-native-vector-icons/Feather');
  export import Foundation = require('react-native-vector-icons/Foundation');
  export import Octicons = require('react-native-vector-icons/Octicons');
  export import SimpleLineIcons = require('react-native-vector-icons/SimpleLineIcons');
  export import Zocial = require('react-native-vector-icons/Zocial');
}


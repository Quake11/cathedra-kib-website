import { Skill } from './skill.interface';
import { Practice } from './practice.interface';
import { Module } from './module.interface';

export interface Program {
  uid?: string;
  name: string;
  graduation: string;
  subtitle: string;
  id: string;
  backgroundColor: string;
  fontColor: string;
  imgLogo: string;
  imgCover: string;
  places?: number;
  skills?: Array<Skill>;
  practices?: Array<Practice>;
  modules?: Array<Module>;
}

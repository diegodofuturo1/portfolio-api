import { User } from './user.entity';
import { Endpoint } from './request/endpoint.entity';
import { Param } from './request/param.entity';
import { About } from './portfolio/about.entity';
import { Education } from './portfolio/education.entity';
import { Experience } from './portfolio/experience.entity';
import { Portfolio } from './portfolio/portfolio.entity';
import { Skill } from './portfolio/skill.entity';
import { Test } from './request/test.entity';
import { TestParam } from './request/test-param.entity';
import { TestGroup } from './request/test-group.entity';

export default [
  User,
  About,
  Education,
  Experience,
  Portfolio,
  Skill,
  Endpoint,
  Param,
  Test,
  TestParam,
  TestGroup,
];

export {
  User,
  About,
  Education,
  Experience,
  Portfolio,
  Skill,
  Endpoint,
  Param,
  Test,
  TestParam,
  TestGroup,
};

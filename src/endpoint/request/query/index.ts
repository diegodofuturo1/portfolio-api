import {
  ReadEndpointByIdQuery,
  ReadEndpointByIdQueryHandler,
} from './read-endpoint-by-id.query';
import {
  ReadEndpointQuery,
  ReadEndpointQueryHandler,
} from './read-endpoint.query';
import {
  ReadParamByEndpointIdQuery,
  ReadParamByEndpointIdQueryHandler,
} from './read-param-by-endpoint-id.query';
import {
  ReadParamByIdQuery,
  ReadParamByIdQueryHandler,
} from './read-param-by-id.query';
import { ReadParamQuery, ReadParamQueryHandler } from './read-param.query';

export default [
  ReadEndpointByIdQueryHandler,
  ReadEndpointQueryHandler,
  ReadParamByEndpointIdQueryHandler,
  ReadParamByIdQueryHandler,
  ReadParamQueryHandler,
];

export {
  ReadEndpointByIdQuery,
  ReadEndpointQuery,
  ReadParamByEndpointIdQuery,
  ReadParamByIdQuery,
  ReadParamQuery,
};

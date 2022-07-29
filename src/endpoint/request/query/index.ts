import {
  ReadEndpointByIdQuery,
  ReadEndpointByIdQueryHandler,
} from './read-endpoint-by-id.query';
import {
  ReadParamByEndpointIdQuery,
  ReadParamByEndpointIdQueryHandler,
} from './read-param-by-endpoint-id.query';
import {
  ReadParamByIdQuery,
  ReadParamByIdQueryHandler,
} from './read-param-by-id.query';

export default [
  ReadEndpointByIdQueryHandler,
  ReadParamByEndpointIdQueryHandler,
  ReadParamByIdQueryHandler,
];

export {
  ReadEndpointByIdQuery,
  ReadParamByEndpointIdQuery,
  ReadParamByIdQuery,
};

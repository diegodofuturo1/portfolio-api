import {
  CreateEndpointCommand,
  CreateEndpointCommandHandler,
} from './create-endpoint.command';
import {
  CreateParamCommand,
  CreateParamCommandHandler,
} from './create-param.command';
import {
  DeleteEndpointCommand,
  DeleteEndpointCommandHandler,
} from './delete-endpoint.command';
import {
  DeleteParamCommand,
  DeleteParamCommandHandler,
} from './delete-param.command';
import {
  UpdateEndpointCommand,
  UpdateEndpointCommandHandler,
} from './update-endpoint.command';
import {
  UpdateParamCommand,
  UpdateParamCommandHandler,
} from './update-param.command';

export default [
  CreateEndpointCommandHandler,
  CreateParamCommandHandler,
  DeleteEndpointCommandHandler,
  DeleteParamCommandHandler,
  UpdateEndpointCommandHandler,
  UpdateParamCommandHandler,
];

export {
  CreateEndpointCommand,
  CreateParamCommand,
  DeleteEndpointCommand,
  DeleteParamCommand,
  UpdateEndpointCommand,
  UpdateParamCommand,
};

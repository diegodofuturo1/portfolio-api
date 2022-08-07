import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Endpoint, Param } from 'src/entity';
import { EndpointDto, ParamDto } from './dto';
import {
  ReadEndpointByIdQuery,
  ReadParamByIdQuery,
  ReadParamByEndpointIdQuery,
} from './query';
import {
  CreateEndpointCommand,
  DeleteEndpointCommand,
  UpdateEndpointCommand,
  CreateParamCommand,
  DeleteParamCommand,
  UpdateParamCommand,
} from './command';
import { ReadEndpointQuery } from './query/read-endpoint.query';
import { ReadParamQuery } from './query/read-param.query';

@Injectable()
export class RequestService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createEndpoint(
    endpoint: EndpointDto,
    userId: string,
  ): Promise<Endpoint> {
    return await this.commandBus.execute(
      new CreateEndpointCommand(endpoint, userId),
    );
  }

  async readEndpoint(userId: string): Promise<Endpoint> {
    return await this.queryBus.execute(new ReadEndpointQuery(userId));
  }

  async readEndpointbyId(id: string, userId: string): Promise<Endpoint> {
    return await this.queryBus.execute(new ReadEndpointByIdQuery(id, userId));
  }

  async updateEndpoint(
    id: string,
    endpoint: EndpointDto,
    userId: string,
  ): Promise<Endpoint> {
    const _endpoint = await this.readEndpointbyId(id, userId);
    return await this.commandBus.execute(
      new UpdateEndpointCommand(_endpoint, { ...endpoint, id, userId }),
    );
  }

  async deleteEndpoint(id: string, userId: string): Promise<Endpoint> {
    const _endpoint = await this.readEndpointbyId(id, userId);
    return await this.commandBus.execute(new DeleteEndpointCommand(_endpoint));
  }

  async createParam(param: ParamDto, userId: string): Promise<Param> {
    return await this.commandBus.execute(new CreateParamCommand(param, userId));
  }

  async readParam(userId: string): Promise<Param> {
    return await this.queryBus.execute(new ReadParamQuery(userId));
  }

  async readParambyId(id: string, userId: string): Promise<Param> {
    return await this.queryBus.execute(new ReadParamByIdQuery(id, userId));
  }

  async readParambyEndpointId(id: string, userId: string): Promise<Param> {
    return await this.queryBus.execute(
      new ReadParamByEndpointIdQuery(id, userId),
    );
  }

  async updateParam(
    id: string,
    param: ParamDto,
    userId: string,
  ): Promise<Param> {
    const _param = await this.readParambyId(id, userId);
    return await this.commandBus.execute(
      new UpdateParamCommand(_param, {
        ...param,
        id,
        userId,
        endpointId: _param.endpointId,
      }),
    );
  }

  async deleteParam(id: string, userId: string): Promise<Param> {
    const _param = await this.readParambyId(id, userId);
    return await this.commandBus.execute(new DeleteParamCommand(_param));
  }
}

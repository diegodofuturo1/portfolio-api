import { Injectable } from '@nestjs/common';
import { EndpointDto, ParamDto } from './dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserService } from '../users/user.service';
import { Endpoint, Param, Test, TestParam } from 'src/entity';
import { ReadTestParamQuery } from './query/read-test-param.query';
import {
  ReadEndpointQuery,
  ReadParamQuery,
  ReadTestQuery,
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

@Injectable()
export class RequestService {
  constructor(
    private users: UserService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createEndpoint(endpoint: EndpointDto, userId: string): Promise<Endpoint> {
    return await this.commandBus.execute(new CreateEndpointCommand(endpoint, userId));
  }

  async readEndpoint(userId: string): Promise<Endpoint> {
    return await this.queryBus.execute(new ReadEndpointQuery(userId));
  }

  async readEndpointbyId(id: string, userId: string): Promise<Endpoint> {
    return await this.queryBus.execute(new ReadEndpointByIdQuery(id, userId));
  }

  async updateEndpoint(id: string, endpoint: EndpointDto, userId: string): Promise<Endpoint> {
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
    return await this.queryBus.execute(new ReadParamByEndpointIdQuery(id, userId));
  }

  async updateParam(id: string, param: ParamDto, userId: string): Promise<Param> {
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

  async initTest(userId: string): Promise<void> {
    await this.users.deleteUserByEmail('teste@teste.com', userId);
  }

  async getTests(userId: string): Promise<Test> {
    return await this.queryBus.execute(new ReadTestQuery(userId));
  }

  async getTestParam(testId: string, userId: string) {
    const params: TestParam[] = await this.queryBus.execute(new ReadTestParamQuery(testId, userId));
    const promises = params.map(async (param) => {
      const promise = await this.readParambyId(param.paramId, userId);
      return {
        ...promise,
        ...param,
      };
    });
    return await Promise.all(promises);
  }
}

import { BaseFindManyDto } from '@app/common/dto';
import { IncludeArgs } from '../types/include.type';

export class FindManyDto {
  baseQueryFindManyDto: BaseFindManyDto;
  include?: IncludeArgs;
  where?: object;
}

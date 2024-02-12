import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class PrismaException extends InternalServerErrorException {
  private readonly logger = new Logger(PrismaException.name);

  constructor(error: Prisma.PrismaClientKnownRequestError) {
    let msg: any = 'Fail to process data. Please try again later';

    if (error.code === 'P2002') {
      const scope = error?.meta?.target;
      msg = `Unique constraint exception at field ${scope}.`;
    }

    if (error.code === 'P2003') {
      msg = `Child record not found at ${error?.meta?.field_name}.`;
    }

    if (error.code === 'P2025') {
      msg = `Fail to connect to some record. Please check the id and make sure the record exist.`;
    }

    super(msg);
    this.logger.error(error);
  }
}

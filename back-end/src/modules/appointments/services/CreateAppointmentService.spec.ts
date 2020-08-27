import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1123');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 7, 18, 16);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

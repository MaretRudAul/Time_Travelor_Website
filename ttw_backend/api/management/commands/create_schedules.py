from django.core.management.base import BaseCommand
from django_q.tasks import Schedule


class Command(BaseCommand):
    help = "Creates the schedule for generating secure tokens every minute"

    def handle(self, *args, **kwargs):
        # Check if the schedule already exists to avoid duplicates
        if not Schedule.objects.filter(func="api.tasks.generate_token").exists():
            Schedule.objects.create(
                func="api.tasks.generate_token",
                schedule_type=Schedule.MINUTES,
                minutes=1,
                repeats=-1,  # Run indefinitely
            )
            self.stdout.write(self.style.SUCCESS("Schedule created successfully!"))
        else:
            self.stdout.write(self.style.WARNING("Schedule already exists."))

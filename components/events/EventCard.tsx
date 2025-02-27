import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/outline";
import moment from "moment-timezone";

const TIMEZONE = "America/Denver";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const mountainTime = moment.tz(event.dateTime ?? "", TIMEZONE);
  const formattedDate = mountainTime.format("MMMM D, YYYY");
  const formattedTime = mountainTime.format("h:mm A");

  return (
    <Card className="flex flex-col h-full">
      {event.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader>
        <h3 className="text-xl font-semibold">{event.title}</h3>
        <p className="text-sm text-gray-500">Hosted by {event.vendor}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarIcon className="h-5 w-5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ClockIcon className="h-5 w-5" />
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPinIcon className="h-5 w-5" />
            <span>{event.location}</span>
          </div>
          {event.maxAttendees && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <UsersIcon className="h-5 w-5" />
              <span>
                {event.currentAttendees} / {event.maxAttendees} registered
              </span>
            </div>
          )}
          <div 
            className="mt-3 text-gray-700 prose prose-sm max-w-none" 
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/events/${event.id}/register`} className="w-full">
          <Button className="w-full">Register Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

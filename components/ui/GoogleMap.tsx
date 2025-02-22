interface GoogleMapProps {
  address: string;
  height?: string;
}

export function GoogleMap({ address, height = "400px" }: GoogleMapProps) {
  const encodedAddress = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCalhvCU0Uz3iO_HUPee7F4LCMJ4EZgScI&q=${encodedAddress}`;

  return (
    <iframe
      src={mapSrc}
      width="100%"
      height={height}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

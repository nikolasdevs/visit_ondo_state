// components/HotelById.tsx (Server Component)
import prisma from "@/lib/db";
import HotelCarouselClient from "./clientside";
import { Box, Flex, Text } from "@radix-ui/themes";

const HotelById = async ({ params }: { params: { slug: string } }) => {
  // Fetch hotel details by slug
  const hotel = await prisma.accommodation.findUnique({
    where: { slug: params.slug },
  });

  // Handle case where hotel is not found
  if (!hotel) {
    return <p>Hotel not found.</p>;
  }

  // Ensure imageUrls is an array
  const images = Array.isArray(hotel.imageUrls) ? hotel.imageUrls : [];

  return (
    <main className=" w-full bg-primary-foreground mx-auto p-4 h-screen">
      <div className="max-w-7xl mx-auto top-48 relative">
        <div className="w-full px-8">
          <h1 className="text-6xl font-extrabold mb-6 text-primary">
            {hotel.title}
          </h1>
          <p className="text-3xl font-medium ">{hotel.description}</p>
          <div className="flex w-full h-auto  mt-8 gap-8">
            <div className="w-2/3">
              {images.length > 0 ? (
                <HotelCarouselClient images={images} />
              ) : (
                <p>No images available for this hotel.</p>
              )}
            </div>
            <div className="bg-green-400 w-1/3 ">
              <Box
                maxWidth="100%"
                className="text-primary-foreground bg-primary h-full shadow-md p-4 font-medium"
              >
                <Flex gap="3" align="start" className="flex flex-col">
                  <Text as="div" className="text-3xl font-bold">
                    Contact Information
                  </Text>
                  <Text as="div">{hotel.address}</Text>
                  <Text as="div">+234123123123</Text>
                  <Text as="div">info@hotela.com</Text>
                  <Text as="div">www.hotel-a.com</Text>
                </Flex>{" "}
              </Box>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HotelById;

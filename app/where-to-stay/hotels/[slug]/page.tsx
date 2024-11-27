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
    <div className=" w-full bg-primary-foreground mx-auto p-4 h-screen">
      <div className="max-w-7xl mx-auto top-48 relative">
        <div className="w-[48rem] px-8">
          <p className="text-6xl font-bold mb-6">{hotel.title}</p>
          <p>{hotel.description}</p>

          <div className="mt-8 w-full md:w-full">
            {images.length > 0 ? (
              <HotelCarouselClient images={images} />
            ) : (
              <p>No images available for this hotel.</p>
            )}
          </div>

          <Box
            maxWidth="300px"
            className="text-primary bg-primary-foreground mt-8 shadow-md p-4 font-medium"
          >
            <Flex gap="3" align="start" className="flex flex-col">
              <Text as="div" className="text-lg font-bold">
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
  );
};

export default HotelById;

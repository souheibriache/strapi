import Image from "next/image";

type Author = {
  id: string;
  attributes: {
    username: string;
    email?: string;
    bio?: string;
    avatar?: {
      data: {
        attributes: {
          url: string;
        };
      } | null;
    };
  };
};

export default function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg flex items-start gap-4">
      <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        {author.attributes.avatar?.data ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${author.attributes.avatar.data.attributes.url}`}
            alt={author.attributes.username}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {author.attributes.username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">About the Author</h3>
        <h4 className="font-medium mb-2">{author.attributes.username}</h4>
        {author.attributes.bio ? (
          <p className="text-gray-600">{author.attributes.bio}</p>
        ) : (
          <p className="text-gray-500 italic">
            This author hasn't added a bio yet.
          </p>
        )}
      </div>
    </div>
  );
}

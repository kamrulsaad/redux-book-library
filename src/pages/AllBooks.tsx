/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import BookCard from '@/components/BookCard';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useGetBooksQuery } from '@/redux/features/book/bookApi';
import { IBook } from '@/types/book';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { IBook } from '@/types/book';

export default function AllBooks() {
  const { data } = useGetBooksQuery(undefined);

//   const { priceRange, status } = useAppSelector(state => state.product);
//   const dispatch = useAppDispatch();

//   const handleSlider = (value: number[]) => {
//     dispatch(setPriceRange(value[0]));
//   };

//   const  productsData = data?.data;

//   if (status) {
//     productsData = data?.data?.filter(
//       (item: { status: boolean; price: number }) =>
//         item.status === true && item.price < priceRange
//     );
//   } else if (priceRange > 0) {
//     productsData = data?.data?.filter(
//       (item: { price: number }) => item.price < priceRange
//     );
//   } else {
//     productsData = data?.data;
//   }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div
            className="flex items-center space-x-2 mt-3"
          >
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          
          <div>From 0$ To 150$</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-2 gap-10 pb-20">
        {data?.data?.map((book: IBook) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}

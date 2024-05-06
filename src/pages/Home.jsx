import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FetchCrypto from "@/hooks/FetchCrypto";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import Categories from "@/components/Categories";
import CoinsList from "@/components/CoinsList";

export default function Home() {
  const { pageNumber = 1 } = useParams();
  const navigate = useNavigate();

  const setPage = (num) => navigate(`/page/${num}`);

  const totalCoins = 14038;
  const coinPerPage = 100;
  const totalPages = Math.ceil(totalCoins / coinPerPage);

  const top = FetchCrypto(
    `https://api.coingecko.com/api/v3/coins/markets?page=${pageNumber}&vs_currency=usd&price_change_percentage=1h%2C24h%2C7d&x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R`
  );
  const trend = FetchCrypto(
    "https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R"
  );

  const categories = FetchCrypto(
    "https://api.coingecko.com/api/v3/coins/categories?x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R"
  );

  useEffect(() => {
    if (top.data) {
      console.log(top);
    }
  }, [top.data]);

  useEffect(() => {
    if (trend.data) {
      console.log(trend);
    }
  }, [trend.data]);

  useEffect(() => {
    if (categories.data) {
      console.log(categories);
    }
  }, [categories.data]);

  const handleCategories = () => {
    navigate("/categories");
  };

  const arrowUpOrDown = (value) => {
    const direction = value?.toString().startsWith("-") ? "down" : "up";
    return (
      <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
        <path
          d={direction === "up" ? "M7 14l5-5 5 5H7z" : " M7 10l5 5 5-5H7z"}
        />
      </svg>
    );
  };

  if (top.loading || trend.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="flex my-5">
        <Card>
          <CardHeader>
            <span className="font-bold px-3 text-xl">🔥 Tendance</span>
          </CardHeader>
          <CardContent>
            {/* utilisation de slice a la place de filter plus optimisé */}
            {/* filter parcourt tout le tableau alors que slice s'arrete a 3 dans ce cas */}
            {trend.data.coins.slice(0, 3).map((coin) => {
              return (
                <Link key={coin.item.id} to={`/${coin.item.id}`}>
                  <div className="flex items-center space-x-3 hover:bg-slate-600 p-3 rounded-xl">
                    <img
                      src={coin.item.small}
                      alt={coin.item.name}
                      width={25}
                    />
                    <span>{coin.item.name}</span>
                    <span>{coin.item.data.price.toFixed(4)} $</span>
                    <span
                      className={`flex items-center ${
                        coin.item.data.price_change_percentage_24h.usd
                          .toString()
                          .startsWith("-")
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {arrowUpOrDown(
                        coin.item.data.price_change_percentage_24h.usd.toFixed(
                          1
                        )
                      )}
                      {coin.item.data.price_change_percentage_24h.usd.toFixed(
                        1
                      )}
                      %
                    </span>
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>
      <Button onClick={handleCategories}>Catégories</Button>
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Name </TableHead>
            <TableHead className="font-bold">Price </TableHead>
            <TableHead className="font-bold">1 h </TableHead>
            <TableHead className="font-bold">24 h </TableHead>
            <TableHead className="font-bold">7 j </TableHead>
            <TableHead className="font-bold">ATH </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {location.pathname === "/categories" ? (
            <>
              {categories.data.map((post, index) => {
                return <Categories post={post} key={index} />;
              })}
            </>
          ) : (
            <>
              {top.data.map((post, index) => {
                return <CoinsList post={post} key={index} />;
              })}
            </>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center my-5">
        {location.pathname !== "/categories" && (
          <Pagination
            totalPages={totalPages}
            currentPage={parseInt(pageNumber, 10)}
            setCurrentPage={setPage}
            pagesCount={totalPages}
            pagesCutCount={5}
          />
        )}
      </div>
    </div>
  );
}

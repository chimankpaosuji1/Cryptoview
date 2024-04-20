import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FetchCrypto from "@/hooks/FetchCrypto";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useEffect } from "react";

export default function Home() {
  const top = FetchCrypto(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h%2C24h%2C7d&x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R"
  );
  const trend = FetchCrypto(
    "https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R"
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

  const formatPercentage = (value) => {
    return Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      signDisplay: "never",
    }).format(value / 100);
  };

  const arrowUpOrDown = (value) => {
    if (value.toString().startsWith("-")) {
      const arrow = (
        <svg
          fill="currentColor"
          className="w5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
        </svg>
      );
      return arrow;
    } else {
      const arrow = (
        <svg
          fill="currentColor"
          className="w5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z" />
        </svg>
      );
      return arrow;
    }
  };

  if (top.loading || trend.loading) {
    return <div>Loading...</div>;
  }
  const filteredTrend = trend.data.coins.filter((item, index) => index < 3);
  return (
    <div className="container">
      <div className="flex my-5">
        <Card>
          <CardHeader>
            <span className="font-bold px-3 text-xl">🔥 Tendance</span>
          </CardHeader>
          <CardContent>
            {filteredTrend.map((coin) => {
              return (
                <Link key={coin.item.id} to={`/${coin.item.id}`}>
                  <div>
                    <div className="flex align-items-center space-x-3 hover:bg-slate-600 p-3 rounded-xl">
                      <img
                        src={coin.item.small}
                        alt={coin.item.name}
                        width={25}
                      />
                      <span>{coin.item.name}</span>
                      <span>{coin.item.data.price.toFixed(4)} $</span>
                      <span
                        className={`flex ${
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
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>
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
          {top.data.map((post, index) => (
            <TableRow key={index}>
              <Link to={`/${post.id}`}>
                <TableCell
                  key={post.name}
                  className={`${post.name === "Chiliz" ? "text-red-500" : ""}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span style={{ marginRight: "5px" }}>
                    {post.market_cap_rank}.
                  </span>
                  <img
                    width={25}
                    alt={post.name}
                    src={post.image}
                    style={{ marginRight: "5px" }}
                  />
                  <span>{post.name}</span>
                </TableCell>
              </Link>
              <TableCell key={post.current_price}>
                ${post.current_price}
              </TableCell>
              <TableCell
                key={post.price_change_percentage_1h_in_currency}
                className={`${
                  post.price_change_percentage_1h_in_currency
                    .toString()
                    .startsWith("-")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                <span style={{ display: "flex" }}>
                  {arrowUpOrDown(post.price_change_percentage_1h_in_currency)}
                  {formatPercentage(
                    post.price_change_percentage_1h_in_currency
                  )}
                </span>
              </TableCell>
              <TableCell
                key={post.price_change_percentage_24h_in_currency}
                className={`${
                  post.price_change_percentage_24h_in_currency
                    .toString()
                    .startsWith("-")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                <span style={{ display: "flex" }}>
                  {arrowUpOrDown(post.price_change_percentage_24h_in_currency)}
                  {formatPercentage(
                    post.price_change_percentage_24h_in_currency
                  )}
                </span>
              </TableCell>
              <TableCell
                key={post.price_change_percentage_7d_in_currency}
                className={`${
                  post.price_change_percentage_7d_in_currency
                    .toString()
                    .startsWith("-")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                <span style={{ display: "flex" }}>
                  {arrowUpOrDown(post.price_change_percentage_7d_in_currency)}
                  {formatPercentage(
                    post.price_change_percentage_7d_in_currency
                  )}
                </span>
              </TableCell>
              <TableCell key={post.ath}>${post.ath}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

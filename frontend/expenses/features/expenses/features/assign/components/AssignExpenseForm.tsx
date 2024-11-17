"use client";

import config from "@/app-config.json";
import AccountDetailsT from "@/features/accounts/features/details/types/AccountDetailsT";
import AccountHeader from "@/features/accounts/components/AccountHeader";
import {
  Box,
  Button,
  FormControlLabel,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { ReactElement } from "react";
import PlannedExpenseDTO from "@/features/expenses/types/PlannedExpenseT";
import PlannedExpenseT, {
  defaultPlannedExpense,
  PlannedExpenseTSchema,
} from "@/features/expenses/types/PlannedExpenseT";
import { Controller, useForm } from "react-hook-form";
import useAssignExpenseApi from "@/features/expenses/features/assign/api/useAssignExpenseApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/ErrorPage";
import WaitingPrompt from "@/components/WaitingPrompt";
import TextFormInput from "@/components/form/TextFormInput";
import { DatePicker } from "@mui/x-date-pickers";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import CurrencyE from "@/common/types/CurrencyE";
import CurrencyFrancIcon from "@mui/icons-material/CurrencyFranc";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import ApiMapper from "@/features/expenses/features/assign/utils/ApiMapper";

const currencies = [
  {
    key: CurrencyE.CHF,
    name: "Swiss Francs",
    icon: () => <CurrencyFrancIcon />,
  },
  { key: CurrencyE.EUR, name: "Euros", icon: () => <EuroIcon /> },
  {
    key: CurrencyE.GBP,
    name: "British Pounds",
    icon: () => <CurrencyPoundIcon />,
  },
];

type Props = {
  account: AccountDetailsT;
};
const AssignExpenseForm = ({ account }: Props): ReactElement => {
  const { postRequest, isLoading, error } = useAssignExpenseApi();
  const router = useRouter();
  const { control, handleSubmit, setValue } = useForm<PlannedExpenseT>({
    defaultValues: defaultPlannedExpense,
    resolver: yupResolver(PlannedExpenseTSchema),
  });

  const onSubmit = async (data: PlannedExpenseT) => {
    const dto = ApiMapper.domainToApi(data);
    console.info(
      `requesting to assign expense ${data.amount} ${data.currency} to account ${data.accountNo}`,
    );
    await postRequest(dto);
    router.push(config.ACCOUNT_DETAILS_PARTIAL_URL);
  };

  if (error) {
    return (
      <ErrorPage
        prompt="Error while saving expense to server."
        nextRoute={config.ACCOUNT_DETAILS_PARTIAL_URL}
      />
    );
  }

  if (isLoading) {
    return <WaitingPrompt prompt="Saving data to server..." />;
  }

  // @ts-ignore
  return (
    <Stack spacing={2} padding={2}>
      <AccountHeader account={account} />
      <Paper elevation={3}>
        <Grid container direction="column" rowSpacing={2} padding={2}>
          <Grid item>
            <Typography variant="subtitle2">Expense</Typography>
          </Grid>
          <Grid item>
            <Paper elevation={3}>
              <Box padding={2}>
                <Grid container direction="column" rowSpacing={2}>
                  <Grid item>
                    <Grid container direction="row" columnSpacing={2}>
                      <Grid item xs={4}>
                        <TextFormInput
                          fieldName="recipient"
                          control={control}
                          label="Recipient"
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <TextFormInput
                          fieldName="purpose"
                          control={control}
                          label="Purpose"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      columnSpacing={2}
                      alignItems="stretch"
                    >
                      <Grid item xs={4}>
                        <Controller
                          control={control}
                          name="accruedDate"
                          render={({ field: { onChange, value, ref } }) => (
                            <DatePicker
                              label="Accrued"
                              onChange={onChange}
                              value={dayjs(value)}
                              slotProps={{ textField: { fullWidth: true } }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFormInput
                          fieldName="amount"
                          label="Amount"
                          control={control}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Grid container justifyContent="flex-end">
                          <Grid item xs={12}>
                            <Controller
                              name="currency"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <FormControl size="small" fullWidth>
                                  <Select
                                    variant="filled"
                                    value={value}
                                    onChange={onChange}
                                  >
                                    {currencies.map((currency) => (
                                      <MenuItem
                                        key={currency.key}
                                        value={currency.key}
                                      >
                                        <Grid
                                          container
                                          direction="row"
                                          alignitems="center"
                                        >
                                          <Grid item>
                                            <ListItemIcon>
                                              {currency.icon()}
                                            </ListItemIcon>
                                          </Grid>
                                          <Grid>
                                            <ListItemText>
                                              {currency.name}
                                            </ListItemText>
                                          </Grid>
                                        </Grid>
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              )}
                            ></Controller>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={3}>
              <Box padding={2}>
                <Grid container direction="row" columnSpacing={2}>
                  <Grid item xs={4}>
                    <RadioGroup>
                      <FormControlLabel
                        control={<Radio />}
                        label="Invoice Expected"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="Not Invoiced"
                        value={false}
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container direction="row" columnSpacing={2}>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={4}>
                        <Button>Upload Invoice</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={3}>
              <Box padding={2}>
                <Grid container direction="row" columnSpacing={2}>
                  <Grid item xs={4}>
                    <Controller
                      control={control}
                      name="paymentDate"
                      render={({ field: { onChange, value, ref } }) => (
                        <DatePicker
                          label="Payment"
                          onChange={onChange}
                          value={dayjs(value)}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Button>Upload Receipt</Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              sx={{
                justifyContent: "flex-end",
              }}
            >
              <Grid item xs={1}>
                <Button
                  onClick={() => {
                    router.push(config.ACCOUNT_DETAILS_PARTIAL_URL);
                  }}
                >
                  CANCEL
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button onClick={handleSubmit(onSubmit)}>SAVE</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default AssignExpenseForm;
